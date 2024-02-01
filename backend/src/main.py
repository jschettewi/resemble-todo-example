import asyncio
import logging
from todo_app.v1.todo_lists_rsm import TodoLists
from todo_app.v1.todo_list_rsm import TodoList
from todo_app.v1.twilio_texts_rsm import TwilioTexts
from todo_lists_servicer import TodoListsServicer
from todo_list_servicer import TodoListServicer
from twilio_texts_servicer import TwilioTextsServicer
from resemble.aio.applications import Application
from resemble.aio.workflows import Workflow

logging.basicConfig(level=logging.INFO)

# TODO_LIST_ID = 'todo-list'
TODO_LISTS_ID = 'todo-lists'
TWILIO_TEXTS_ID = 'twilio-texts'


async def initialize(workflow: Workflow):

    #todolist = TodoList(TODO_LIST_ID)
    todolists = TodoLists(TODO_LISTS_ID)
    twiliotexts = TwilioTexts(TWILIO_TEXTS_ID)

    # Implicitly construct todolist upon first write.
    await todolists.AddTodoList(workflow, name='First List')
    #await todolists.AddTodoList(workflow, name='second list')
    #await todolist.AddTodo(workflow, todo='Test')
    #await todolists.ListTodoLists(workflow)
    
    # construct TwilioTexts
    #await twiliotexts.Create(workflow)


async def main():
    application = Application(
        servicers=[TodoListsServicer, TodoListServicer, TwilioTextsServicer],
        initialize=initialize,
    )

    logging.info('👋 Ready to add todos! 👋')

    await application.run()


if __name__ == '__main__':
    asyncio.run(main())
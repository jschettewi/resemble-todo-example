import asyncio
import logging
from todo_app.v1.todo_lists_rsm import TodoLists
from todo_app.v1.todo_list_rsm import TodoList
from todo_lists_servicer import TodoListsServicer
from todo_list_servicer import TodoListServicer
from resemble.aio.applications import Application
from resemble.aio.workflows import Workflow

logging.basicConfig(level=logging.INFO)

# TODO_LIST_ID = 'todo-list'
TODO_LISTS_ID = 'todo-lists'
TODO_LIST_ID = 'todo-list'


async def initialize(workflow: Workflow):
    todolist = TodoList(TODO_LIST_ID)
    todolists = TodoLists(TODO_LISTS_ID)

    # Implicitly construct todolist upon first write.
    await todolists.AddTodoList(workflow, text='Text')
    await todolist.AddTodo(workflow, todo='Test')


async def main():
    application = Application(
        servicers=[TodoListsServicer, TodoListServicer],
        initialize=initialize,
    )

    logging.info('👋 Ready to add todos! 👋')

    await application.run()


if __name__ == '__main__':
    asyncio.run(main())
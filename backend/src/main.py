import asyncio
import logging
from todo_app.v1.todo_app_rsm import TodoList
from todo_app.v1.todo_app_rsm import TodoLists
from todo_list_servicer import TodoListServicer
from todo_lists_servicer import TodoListsServicer
from resemble.aio.applications import Application
from resemble.aio.workflows import Workflow

logging.basicConfig(level=logging.INFO)

TODO_LIST_ID = 'todo-list'
TODO_LISTS_ID = 'todo-lists'


async def initialize(workflow: Workflow):
    todolist = TodoList(TODO_LIST_ID)
    todolists = TodoLists(TODO_LISTS_ID)

    # Implicitly construct greeter upon first write.
    await todolist.AddTodo(workflow, todo="add todos")
    await todolists.AddTodoList(workflow, text='Text')


async def main():
    application = Application(
        servicers=[TodoListServicer, TodoListsServicer],
        initialize=initialize,
    )

    logging.info('👋 Ready to add todos! 👋')

    await application.run()


if __name__ == '__main__':
    asyncio.run(main())
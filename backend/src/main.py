import asyncio
import logging
from todo_list.v1.todo_list_rsm import TodoList
from todo_list_servicer import TodoListServicer
from resemble.aio.applications import Application
from resemble.aio.workflows import Workflow

logging.basicConfig(level=logging.INFO)

TODO_LIST_ID = 'todo-list'


async def initialize(workflow: Workflow):
    todolist = TodoList(TODO_LIST_ID)

    # Implicitly construct greeter upon first write.
    await todolist.AddTodo(workflow, todo="add todos")


async def main():
    application = Application(
        servicers=[TodoListServicer],
        initialize=initialize,
    )

    logging.info('👋 Ready to add todos! 👋')

    await application.run()


if __name__ == '__main__':
    asyncio.run(main())

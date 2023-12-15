import asyncio
import todo_app.v1.todo_app_pb2
import uuid
from todo_app.v1.todo_app_rsm import (
    ListOfTodos,
    TodoLists,
    TodoListsSate,
    AddTodoListRequest,
    AddTodoListResponse,
    ListTodoListsRequest,
    ListTodoListsResponse,
    DeleteTodoListRequest,
    DeleteTodoListResponse,
)
from resemble.aio.contexts import ReaderContext, WriterContext

class TodoListsServicer(TodoLists.Interface):

    async def AddTodoList(
        self,
        context: WriterContext,
        state: TodoListsSate,
        request: AddTodoListRequest,
    ) -> TodoLists.AddTodoListEffects:
        text = request.text
        unique_id = str(uuid.uuid4())
        todoListObject = ListOfTodos(id=unique_id, name=text)
        state.todolists.extend([todoListObject])
        print(f"Adding todo list '{text}'")
        return TodoLists.AddTodoListEffects(state=state, response=AddTodoListResponse())

    async def ListTodoLists(
        self,
        context: ReaderContext,
        state: TodoListsSate,
        request: ListTodoListsRequest,
    ) -> ListTodoListsResponse:
        return ListTodoListsResponse(todolists=state.todolists)
    
    async def DeleteTodoList(
        self,
        context: WriterContext,
        state: TodoListsSate,
        request: DeleteTodoListRequest,
    ) -> TodoLists.DeleteTodoListEffects:
        id = request.id
        for x in state.todolists:
            if x.id == id:
                state.todolists.remove(x)
        return TodoLists.DeleteTodoListEffects(state=state, response=DeleteTodoListResponse())
    
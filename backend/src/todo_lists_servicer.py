import asyncio
import todo_app.v1.todo_lists_pb2
import uuid
from todo_app.v1.todo_list_rsm import TodoList
from todo_app.v1.todo_lists_rsm import (
    TodoLists,
    TodoListObject,
    TodoListsState,
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
        state: TodoListsState,
        request: AddTodoListRequest,
    ) -> TodoLists.AddTodoListEffects:
        text = request.text
        unique_id = str(uuid.uuid4())
        todoListObject = TodoListObject(id=unique_id, name=text)
        state.todolists.extend([todoListObject])
        print(state)
        return TodoLists.AddTodoListEffects(state=state, response=AddTodoListResponse())

    async def ListTodoLists(
        self,
        context: ReaderContext,
        state: TodoListsState,
        request: ListTodoListsRequest,
    ) -> ListTodoListsResponse:
        print("###########")
        print("#############", state.todolists)
        return ListTodoListsResponse(todolists=state.todolists)
    
    async def DeleteTodoList(
        self,
        context: WriterContext,
        state: TodoListsState,
        request: DeleteTodoListRequest,
    ) -> TodoLists.DeleteTodoListEffects:
        id = request.id
        for x in state.todolists:
            if x.id == id:
                state.todolists.remove(x)
        return TodoLists.DeleteTodoListEffects(state=state, response=DeleteTodoListResponse())

        
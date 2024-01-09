import asyncio
import todo_app.v1.todo_lists_pb2
import uuid
from todo_app.v1.todo_list_rsm import TodoList
from todo_app.v1.todo_lists_rsm import (
    TodoLists,
    TodoListMessage,
    TodoListsState,
    AddTodoListRequest,
    AddTodoListResponse,
    ListTodoListsRequest,
    ListTodoListsResponse,
    DeleteTodoListRequest,
    DeleteTodoListResponse,
)
from resemble.aio.contexts import ReaderContext, WriterContext, TransactionContext

class TodoListsServicer(TodoLists.Interface):

    async def AddTodoList(
        self,
        context: TransactionContext,
        # state: TodoListsState,
        request: AddTodoListRequest,
    ) -> AddTodoListResponse:
        
        unique_id = str(uuid.uuid4())
        name = request.name
        
        async def add_todolist(
            context: WriterContext,
            state: TodoListsState,
        ) -> TodoLists.Effects:
            todoListObject = TodoListMessage(id=unique_id, name=name)
            # state.todolists.extend([todoListObject])
            state.todolists.extend([todoListObject])
            print(state)
            return TodoLists.Effects(state=state)
        
        await self.write(context, add_todolist)
       
        # name = request.name
        # unique_id = str(uuid.uuid4())
        # todoListObject = TodoListMessage(id=unique_id, name=name)
        # state.todolists.extend([todoListObject])
        # print(state)
        # return TodoLists.AddTodoListEffects(state=state, response=AddTodoListResponse())
    
        # Let's go create the todolist.
        todolist = TodoList(unique_id)
        await todolist.Create(context, name=name)

        return AddTodoListResponse(id=unique_id)

        #return TodoLists.AddTodoListEffects(state=state, response=AddTodoListResponse(id=unique_id))

    async def ListTodoLists(
        self,
        context: ReaderContext,
        state: TodoListsState,
        request: ListTodoListsRequest,
    ) -> ListTodoListsResponse:
        print("###########", state.todolists)
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

        
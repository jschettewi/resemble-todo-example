import asyncio
import todo_app.v1.todo_app_pb2
import uuid
from todo_app.v1.todo_app_rsm import (
    TodoLists,
    TodoListState,
    TodoList,
    Todo,
    TodoListMessage,
    TodoListsState,
    AddTodoListRequest,
    AddTodoListResponse,
    ListTodoListsRequest,
    ListTodoListsResponse,
    DeleteTodoListRequest,
    DeleteTodoListResponse,
    AddTodoRequest,
    AddTodoResponse,
    ListTodosRequest,
    ListTodosResponse,
    DeleteTodoRequest,
    DeleteTodoResponse,
    CompleteTodoRequest,
    CompleteTodoResponse,
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
        todoListObject = TodoListMessage(id=unique_id, name=text, todos=[])
        state.todolists.extend([todoListObject])
        return TodoLists.AddTodoListEffects(state=state, response=AddTodoListResponse())

    async def ListTodoLists(
        self,
        context: ReaderContext,
        state: TodoListsState,
        request: ListTodoListsRequest,
    ) -> ListTodoListsResponse:
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
    
    # async def AddTodo(
    #     self,
    #     context: WriterContext,
    #     state: TodoListsState,
    #     request: AddTodoRequest,
    # ) -> TodoLists.AddTodoEffects:
    #     ## need to fix this
    #     todolistId = request.todolistId
    #     todo = request.todo
    #     unique_id = str(uuid.uuid4())
    #     todoObject = Todo(id=unique_id, text=todo, complete=False)
    #     targetlist = None
    #     for todolist in state.todolists:
    #         if todolist.id == todolistId:
    #             targetlist = todolist
    #     targetlist.todos.extend([todoObject])
    #     return TodoLists.AddTodoEffects(state=state, response=AddTodoResponse())

    # async def ListTodos(
    #     self,
    #     context: ReaderContext,
    #     state: TodoListState,
    #     request: ListTodosRequest,
    # ) -> ListTodosResponse:
    #     todolistId = request.todolistId
    #     targetlist = None
    #     for todolist in state.todolists:
    #         if todolist.id == todolistId:
    #             targetlist = todolist
    #     if targetlist:
    #         return ListTodosResponse(todos=targetlist.todos)
    #     else:
    #         return ListTodosResponse(todos=[])
    
    # async def DeleteTodo(
    #     self,
    #     context: WriterContext,
    #     state: TodoListsState,
    #     request: DeleteTodoRequest,
    # ) -> TodoLists.DeleteTodoEffects:
    #     # we need the id of the todolist and the id of the todo
    #     todolistId = request.todolistId
    #     todoId = request.todoId
    #     # first find the target list matching the todolist id
    #     targetlist = None
    #     for todolist in state.todolists:
    #         if todolist.id == todolistId:
    #             targetlist = todolist
    #     # now find the correct todo to remove from the target list
    #     targetTodo = None
    #     for todo in targetlist.todos:
    #         if todo.id == todoId:
    #             targetTodo = todo
    #     targetlist.todos.remove(targetTodo)
    #     return TodoLists.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    # async def CompleteTodo(
    #     self, 
    #     context: WriterContext, 
    #     state: TodoListsState, 
    #     request: CompleteTodoRequest,
    #     ) -> TodoLists.CompleteTodoEffects:
    #     todolistId = request.todolistId
    #     todoId = request.todoId
    #     # first find the target list matching the todolist id
    #     targetlist = None
    #     for todolist in state.todolists:
    #         if todolist.id == todolistId:
    #             targetlist = todolist
    #     # now find the correct todo to change to complete from the target list
    #     for todo in targetlist.todos:
    #         if todo.id == todoId:
    #             todo.complete = not todo.complete
    #     return TodoLists.CompleteTodoEffects(state=state, response=CompleteTodoResponse())

        
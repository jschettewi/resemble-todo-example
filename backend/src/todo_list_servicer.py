import asyncio
import todo_list.v1.todo_list_pb2
from todo_list.v1.todo_list_rsm import (
    TodoList,
    TodoListState,
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


class TodoListServicer(TodoList.Interface):

    async def AddTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: AddTodoRequest,
    ) -> TodoList.AddTodoEffects:
        todo = request.todo
        state.todos.extend([todo])
        print(f"Adding todo '{todo}'")
        return TodoList.AddTodoEffects(state=state, response=AddTodoResponse())

    async def ListTodos(
        self,
        context: ReaderContext,
        state: TodoListState,
        request: ListTodosRequest,
    ) -> ListTodosResponse:
        return ListTodosResponse(todos=state.todos)
    
    async def DeleteTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: DeleteTodoRequest,
    ) -> TodoList.DeleteTodoEffects:
        id = request.id
        print("here", id)
        state.todos.remove(state.todos[id])
        # state.todos[id]
        return TodoList.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListState, 
        request: CompleteTodoRequest,
        ) -> TodoList.CompleteTodoEffects:
        print("todo is complete")
        return TodoList.CompleteTodoEffectsC(state=state, response=CompleteTodoResponse())

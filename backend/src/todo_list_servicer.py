import asyncio
import todo_list.v1.todo_list_pb2
import uuid
from todo_list.v1.todo_list_rsm import (
    Todo,
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
        unique_id = str(uuid.uuid4())
        todoObject = Todo(id=unique_id, text=todo, complete=False)
        state.todos.extend([todoObject])
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
        for x in state.todos:
            if x.id == id:
                state.todos.remove(x)
        return TodoList.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListState, 
        request: CompleteTodoRequest,
        ) -> TodoList.CompleteTodoEffects:
        id = request.id
        for x in state.todos:
            if x.id == id:
                x.complete = not x.complete
        return TodoList.CompleteTodoEffects(state=state, response=CompleteTodoResponse())

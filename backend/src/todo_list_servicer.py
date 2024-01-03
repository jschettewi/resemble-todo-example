import asyncio
import todo_app.v1.todo_app_pb2
import uuid
from todo_app.v1.todo_app_rsm import (
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

class TodoListServicer(TodoList.Interface):
    
    async def AddTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: AddTodoRequest,
    ) -> TodoList.AddTodoEffects:
        ## need to fix this
        todolistId = request.todolistId
        todo = request.todo
        # unique_id = str(uuid.uuid4())
        # todoObject = Todo(id=unique_id, text=todo, complete=False)
        # targetlist = None
        # for todolist in state.todolists:
        #     if todolist.id == todolistId:
        #         targetlist = todolist
        # targetlist.todos.extend([todoObject])
        print("adding Todo", todo)
        return TodoList.AddTodoEffects(state=state, response=AddTodoResponse())

    async def ListTodos(
        self,
        context: ReaderContext,
        state: TodoListState,
        request: ListTodosRequest,
    ) -> ListTodosResponse:
        todolistId = request.todolistId
        targetlist = None
        # for todolist in state.todolists:
        #     if todolist.id == todolistId:
        #         targetlist = todolist
        if targetlist:
            return ListTodosResponse(todos=targetlist.todos)
        else:
            return ListTodosResponse(todos=[])
    
    async def DeleteTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: DeleteTodoRequest,
    ) -> TodoList.DeleteTodoEffects:
        # we need the id of the todolist and the id of the todo
        todolistId = request.todolistId
        todoId = request.todoId
        # first find the target list matching the todolist id
        targetlist = None
        for todolist in state.todolists:
            if todolist.id == todolistId:
                targetlist = todolist
        # now find the correct todo to remove from the target list
        targetTodo = None
        for todo in targetlist.todos:
            if todo.id == todoId:
                targetTodo = todo
        targetlist.todos.remove(targetTodo)
        return TodoList.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListState, 
        request: CompleteTodoRequest,
        ) -> TodoList.CompleteTodoEffects:
        todolistId = request.todolistId
        todoId = request.todoId
        # first find the target list matching the todolist id
        targetlist = None
        for todolist in state.todolists:
            if todolist.id == todolistId:
                targetlist = todolist
        # now find the correct todo to change to complete from the target list
        for todo in targetlist.todos:
            if todo.id == todoId:
                todo.complete = not todo.complete
        return TodoList.CompleteTodoEffects(state=state, response=CompleteTodoResponse())

        
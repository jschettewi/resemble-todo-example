import asyncio
import todo_app.v1.todo_list_pb2
import uuid
from todo_app.v1.todo_list_rsm import (
    TodoListState,
    TodoList,
    Todo,
    CreateRequest,
    CreateResponse,
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

    async def Create(
        self,
        context: WriterContext,
        request: CreateRequest,
    ) -> TodoList.CreateEffects:
        # Since this is a constructor, we are setting the initial state of the
        # state machine.
        initial_state = TodoListState(name=request.name)

        # here we can schedule a task if we want to
        # welcome_email_task = self.schedule().WelcomeEmailTask(context)

        print(initial_state.todos)

        return TodoList.CreateEffects(
            state=initial_state,
            response=CreateResponse(),
        )
    
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
        unique_id = str(uuid.uuid4())
        todoObject = Todo(id=unique_id, text=todo, complete=False)
        state.todos.extend([todoObject])
        print("adding Todo", todo)
        return TodoList.AddTodoEffects(state=state, response=AddTodoResponse())

    async def ListTodos(
        self,
        context: ReaderContext,
        state: TodoListState,
        request: ListTodosRequest,
    ) -> ListTodosResponse:
        # todolistId = request.todolistId
        # targetlist = None
        # # for todolist in state.todolists:
        # #     if todolist.id == todolistId:
        # #         targetlist = todolist
        # if targetlist:
        #     return ListTodosResponse(todos=targetlist.todos)
        # else:
        #     return ListTodosResponse(todos=[])
        return ListTodosResponse(todos=state.todos)
    
    async def DeleteTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: DeleteTodoRequest,
    ) -> TodoList.DeleteTodoEffects:
        # we need the id of the todolist and the id of the todo
        # todolistId = request.todolistId
        todoId = request.todoId
        # # first find the target list matching the todolist id
        # targetlist = None
        # for todolist in state.todolists:
        #     if todolist.id == todolistId:
        #         targetlist = todolist
        # # now find the correct todo to remove from the target list
        targetTodo = None
        for todo in state.todos:
            if todo.id == todoId:
                targetTodo = todo
        state.todos.remove(targetTodo)
        return TodoList.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListState, 
        request: CompleteTodoRequest,
        ) -> TodoList.CompleteTodoEffects:
        # todolistId = request.todolistId
        todoId = request.todoId
        # first find the target list matching the todolist id
        # targetlist = None
        # for todolist in state.todolists:
        #     if todolist.id == todolistId:
        #         targetlist = todolist
        # now find the correct todo to change to complete from the target list
        for todo in state.todos:
            if todo.id == todoId:
                todo.complete = not todo.complete
        print("todo:", todoId)
        return TodoList.CompleteTodoEffects(state=state, response=CompleteTodoResponse())

        
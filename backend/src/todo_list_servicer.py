import asyncio
import todo_app.v1.todo_list_pb2
import uuid
from twilio.rest import Client
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
    AddDeadlineRequest,
    AddDealineResponse,
    ReminderTextTaskRequest,
)
from google.protobuf.empty_pb2 import Empty
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
        print("Calling AddTodo!")
        print("State passed into AddTodo", state)
        # todolistId = request.todolistId
        todo = request.todo
        # unique_id = str(uuid.uuid4())
        # todoObject = Todo(id=unique_id, text=todo, complete=False)
        # targetlist = None
        # for todolist in state.todolists:
        #     if todolist.id == todolistId:
        #         targetlist = todolist
        # targetlist.todos.extend([todoObject])
        unique_id = str(uuid.uuid4())
        todoObject = Todo(id=unique_id, text=todo, complete=False, deadline="")
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
        print("ListTodos Called")
        print(state)
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
    
    async def AddDeadline(
        self,
        context: WriterContext,
        state: TodoListState,
        request: AddDeadlineRequest,
    ) -> TodoList.AddDeadlineEffects:
        todoId = request.todoId
        date = request.date
        for todo in state.todos:
            if todo.id == todoId:
                todo.deadline = date
        print("Calling AddDeadline", state)

        # TODO: figure out how to execute scheduled tasks
        reminder_text_task = self.schedule().ReminderTextTask(context, state, request)
        #await self.ReminderTextTask(context, state, request)

        return TodoList.AddDeadlineEffects(
            state=state, 
            response=AddDealineResponse(
                reminder_text_task_id = reminder_text_task.task_id
            ),
        )
    
    async def ReminderTextTask(
        self,
        context: WriterContext,
        state: TodoListState,
        request: ReminderTextTaskRequest,
    ) -> TodoList.ReminderTextTaskEffects:
        
        todoId = request.todoId
        date = request.date
        todoText = None
        for todo in state.todos:
            if todo.id == todoId:
                todoText = todo.text
        
        message_body = "Reminder! You have to complete task '"+todoText+"' by "+date
        await send_text(message_body)

        return TodoList.ReminderTextTaskEffects(
            state=state,
            response=Empty(),
        )


async def send_text(message_body: str):
    #logging.info(f"Sending text:\n====\n{message_body}\n====")
    print("We are sending a text")

    # twilio code here to send a text

    # lets send a message using twillio
    account_sid = 'account_sid'
    auth_token = 'auth_token'
    client = Client(account_sid, auth_token)

    message = client.messages.create(body=message_body, from_='+18554612173', to='+18777804236')

    print(message.sid)

        
import asyncio
import traceback
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
        return ListTodosResponse(todos=state.todos)
    
    async def DeleteTodo(
        self,
        context: WriterContext,
        state: TodoListState,
        request: DeleteTodoRequest,
    ) -> TodoList.DeleteTodoEffects:
        todoId = request.todoId
        targetTodo = None
        for todo in state.todos:
            if todo.id == todoId:
                targetTodo = todo
                break
        state.todos.remove(targetTodo)
        return TodoList.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListState, 
        request: CompleteTodoRequest,
        ) -> TodoList.CompleteTodoEffects:
        todoId = request.todoId
        for todo in state.todos:
            if todo.id == todoId:
                todo.complete = not todo.complete
                break
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
        target_todo = None
        for todo in state.todos:
            if todo.id == todoId:
                todo.deadline = date
                target_todo = todo
                break
        print("Calling AddDeadline")

        reminder_text_task = self.schedule().ReminderTextTask(context, deadline=date, todo=target_todo.text)

        return TodoList.AddDeadlineEffects(
            state=state, 
            tasks=[reminder_text_task],
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
        
        deadline = request.deadline
        todo = request.todo
        
        message_body = "Reminder! You have to complete task '"+todo+"' by "+deadline
        # uncomment line below to send the message in twilio
        await send_text(message_body)

        print("Message:", message_body)

        return TodoList.ReminderTextTaskEffects(
            state=state,
            response=Empty(),
        )


async def send_text(message_body: str):
    #logging.info(f"Sending text:\n====\n{message_body}\n====")
    print("We are sending a text")

    # twilio code here to send a text

    # lets send a message using twillio
    account_sid = 'AC03d5902ba89dd69e3a8b7dc25b61b325'
    auth_token = '2666834c9ccd4a18a3d8be2079bf7145'
    client = Client(account_sid, auth_token)

    message = client.messages.create(body=message_body, from_='+18554612173', to='+18777804236')

    #print(message.sid)

        
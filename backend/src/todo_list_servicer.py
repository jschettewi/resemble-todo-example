import asyncio
import traceback
import todo_app.v1.todo_list_pb2
import uuid
from datetime import datetime, timedelta
from twilio.rest import Client
from todo_app.v1.twilio_texts_rsm import TwilioTexts
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
    AddDeadlineResponse,
)
from google.protobuf.empty_pb2 import Empty
from resemble.aio.contexts import ReaderContext, WriterContext, TransactionContext

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
        todo = request.todo
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
        context: TransactionContext,
        # state: TodoListState,
        request: AddDeadlineRequest,
    ) -> AddDeadlineResponse:
        
        todoId = request.todoId
        date = request.date
        self.todo_body = ""
        
        async def add_deadline(
            context: WriterContext,
            state: TodoListState,
        ) -> TodoList.Effects:
            
            target_todo = None
            for todo in state.todos:
                if todo.id == todoId:
                    todo.deadline = date
                    target_todo = todo
                    self.todo_body = target_todo.text
                    break
            
            return TodoList.Effects(state=state)
        
        await self.write(context, add_deadline)
        
        # Let's go create the TwilioText.
        twilio = TwilioTexts('twilio-texts')
        await twilio.AddText(context, to='+18777804236', body=self.todo_body, create_time=str(datetime.now()))

        # TODO: pass in argument that is the 'time_now' when the task is scheduled
        # reminder_text_task = self.schedule().ReminderTextTask(context, deadline=date, todo=target_todo.text)

        return AddDeadlineResponse()

        # return TodoList.AddDeadlineEffects(
        #     state=state, 
        #     tasks=[reminder_text_task],
        #     response=AddDealineResponse(
        #         reminder_text_task_id = reminder_text_task.task_id
        #     ),
        # )

        
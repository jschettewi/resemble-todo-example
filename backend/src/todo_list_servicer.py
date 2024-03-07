import asyncio
import traceback
import todo_app.v1.todo_list_pb2
import uuid
from datetime import datetime, timezone
from google.protobuf.timestamp_pb2 import Timestamp
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
        request: AddDeadlineRequest,
    ) -> AddDeadlineResponse:
        
        todoId = request.todoId
        date = request.date
        self.target_todo = None
        
        async def add_deadline(
            context: WriterContext,
            state: TodoListState,
        ) -> TodoList.Effects:
            
            for todo in state.todos:
                if todo.id == todoId:
                    todo.deadline = date
                    self.target_todo = todo
                    break
            
            return TodoList.Effects(state=state)
        
        await self.write(context, add_deadline)
        
        # Let's go create the TwilioText.
        twilio = TwilioTexts('twilio-texts')
        text_body = "Reminder! You have to complete task "+self.target_todo.text+" by "+self.target_todo.deadline
        timestamp = Timestamp()
        timestamp.FromDatetime(datetime.now(tz=timezone.utc))
        await twilio.AddText(context, to='+18777804236', body=text_body, create_time=timestamp)

        return AddDeadlineResponse()
        
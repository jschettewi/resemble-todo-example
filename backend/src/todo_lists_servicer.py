import asyncio
import todo_app.v1.todo_app_pb2
import uuid
from todo_app.v1.todo_app_rsm import (
    TodoListState,
    FullTodoList,
    ListOfLists,
    TodoLists,
    TodoListsState,
    AddTodoListRequest,
    AddTodoListResponse,
    ListTodoListsRequest,
    ListTodoListsResponse,
    DeleteTodoListRequest,
    DeleteTodoListResponse,
    Todo,
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
        todoListObject = FullTodoList(id=unique_id, name=text, todos=[])
        state.todolists.extend([todoListObject])
        print(f"Adding todo list '{text}'")
        print(state.todolists)
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
    
    async def AddTodo(
        self,
        context: WriterContext,
        state: TodoListsState,
        request: AddTodoRequest,
    ) -> TodoLists.AddTodoEffects:
        ## need to fix this
        todolistId = request.todolistId
        print(todolistId)
        todo = request.todo
        unique_id = str(uuid.uuid4())
        todoObject = Todo(id=unique_id, text=todo, complete=False)
        targetlist = None
        for todolist in state.todolists:
            if todolist.id == todolistId:
                targetlist = todolist
        targetlist.todos.extend([todoObject])
        # targetlist.todos.extend([todoObject])
        # for list in state.todolists:
        #     if list.id == todolist_id:
        #         list.todos.extend([todoObject])
        print(f"Adding todo '{todo}'")
        return TodoLists.AddTodoEffects(state=state, response=AddTodoResponse())

    async def ListTodos(
        self,
        context: ReaderContext,
        state: TodoListState,
        request: ListTodosRequest,
    ) -> ListTodosResponse:
        todolistId = request.todolistId
        print(todolistId)
        targetlist = None
        for todolist in state.todolists:
            if todolist.id == todolistId:
                targetlist = todolist
        print(targetlist)
        return ListTodosResponse(todos=[])
        # return ListTodosResponse(todos=[Todo(id="1", text="here", complete=False)])
    
    async def DeleteTodo(
        self,
        context: WriterContext,
        state: TodoListsState,
        request: DeleteTodoRequest,
    ) -> TodoLists.DeleteTodoEffects:
        # we need the id of the todolist and the id of the todo
        todolist_id = request.todolist_id
        todo_id = request.todo_id
        for todolist in state.todolists:
            if todolist.id == todolist_id:
                for todo in todolist.todos:
                    if todo.id == todo_id:
                        state.todolist.todos.remove(todo)
        return TodoLists.DeleteTodoEffects(state=state, response=DeleteTodoResponse())
    
    async def CompleteTodo(
        self, 
        context: WriterContext, 
        state: TodoListsState, 
        request: CompleteTodoRequest,
        ) -> TodoLists.CompleteTodoEffects:
        todolistId = request.todolistId
        todoId = request.todoId
        for todolist in state.todolists:
            if todolist.id == todolistId:
                for todo in todolist.todos:
                    if todo.id == todoId:
                        todo.complete = not todo.complete
        return TodoLists.CompleteTodoEffects(state=state, response=CompleteTodoResponse())

        
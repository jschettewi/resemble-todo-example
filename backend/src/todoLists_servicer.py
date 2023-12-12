import asyncio
from hello.v1.hello_rsm import (
    Hello,
    HelloState,
    MessagesRequest,
    MessagesResponse,
    SendRequest,
    SendResponse,
)
from resemble.aio.contexts import ReaderContext, WriterContext


class TodoListsServicer(Hello.Interface):

    async def ListTodoLists(
        self,
        context: ReaderContext,
        state: HelloState,
        request: MessagesRequest,
    ) -> MessagesResponse:
        return MessagesResponse(messages=state.messages)

    async def AddTodoList(
        self,
        context: WriterContext,
        state: HelloState,
        request: SendRequest,
    ) -> Hello.SendEffects:
        message = request.message
        state.messages.extend([message])
        return Hello.SendEffects(state=state, response=SendResponse())
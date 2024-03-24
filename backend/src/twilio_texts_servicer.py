import asyncio
import traceback
import todo_app.v1.todo_list_pb2
import uuid
from datetime import datetime, timedelta
from google.protobuf import timestamp_pb2
from twilio.rest import Client
from todo_app.v1.twilio_texts_rsm import (
    Text,
    Pair,
    UniqueText,
    TwilioTexts,
    TwilioTextsState,
    CreateTwilioTextRequest,
    CreateTwilioTextResponse,
    AddTextRequest,
    AddTextResponse,
    ListTextsRequest,
    ListTextsResponse,
    TwilioReminderTextTaskRequest,
)
from google.protobuf.empty_pb2 import Empty
from resemble.aio.contexts import ReaderContext, WriterContext, TransactionContext

ACCOUNT_SID = 'AC03d5902ba89dd69e3a8b7dc25b61b325'
AUTH_TOKEN = ''
FROM_NUMBER = '+18554612173'

class TwilioTextsServicer(TwilioTexts.Interface):

    async def Create(
        self,
        context: WriterContext,
        request: CreateTwilioTextRequest,
    ) -> TwilioTexts.CreateEffects:
        # Since this is a constructor, we are setting the initial state of the
        # state machine.
        initial_state = TwilioTextsState(texts_to_send=[], texts_accepted=[])

        # here we can schedule a task if we want to
        # welcome_email_task = self.schedule().WelcomeEmailTask(context)

        print(initial_state)

        return TwilioTexts.CreateEffects(
            state=initial_state,
            response=Empty(),
        )
    
    async def AddText(
        self,
        context: WriterContext,
        state: TwilioTextsState,
        request: AddTextRequest,
    ) -> TwilioTexts.AddTextEffects:
        to_number = request.to
        body = request.body
        create_time = request.create_time

        print("##########################")
        print(create_time)
        print("HERE", create_time.ToDatetime())

        new_text = Text(to=to_number, from_=FROM_NUMBER, body=body, create_time=create_time, accepted_time="")

        state.texts_to_send.extend([new_text])

        # TODO: fix this line !!!!!!
        reminder_text_task = self.schedule().ReminderTextTask(context, text_to_send=new_text)
        
        return TwilioTexts.AddTextEffects(
            state=state, 
            tasks=[reminder_text_task],
            response=AddTextResponse(
                reminder_text_task_id = reminder_text_task.task_id
            ),
        )

    async def ListTexts(
        self,
        context: ReaderContext,
        state: TwilioTextsState,
        request: ListTextsRequest,
    ) -> ListTextsResponse:
        return ListTextsResponse(texts=state)
    
    async def ReminderTextTask(
        self,
        context: WriterContext,
        state: TwilioTextsState,
        request: TwilioReminderTextTaskRequest,
    ) -> TwilioTexts.ReminderTextTaskEffects:
        
        text_to_send = request.text_to_send

        earliest_create_time = state.texts_to_send[0].create_time

        text_sent = await has_text_been_sent(text_to_send.to, text_to_send.body, earliest_create_time)
        while not text_sent:
            await send_text(text_to_send.to, text_to_send.body)
            text_sent = await has_text_been_sent(text_to_send.to, text_to_send.body)

        if text_sent:
            state.texts_to_send.remove(text_to_send)
            state.texts_accepted.extend([text_to_send])

        print(state)

        return TwilioTexts.ReminderTextTaskEffects(
            state=state,
            response=Empty(),
        )

async def has_text_been_sent(to_number, text_body, after):
    # connect to twilio account
    client = Client(ACCOUNT_SID, AUTH_TOKEN)
    
    # we should get all messages starting at time from last message that was sent while all messages still haven't been sent
    messages = client.messages.list(date_sent_after=after.ToDatetime(), limit=20)

    for record in messages:
        if record.to == to_number and record.body == "Sent from your Twilio trial account - "+text_body:
            return True
            # if record.status in ['sent', 'delivered']:
            #     return True

    return False

async def send_text(to_number, message_body):
    print("We are sending a text")

    # lets send a message using twillio
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    message = client.messages.create(body=message_body, from_='+18554612173', to=to_number)

    print(message.sid)
    return
    
# async def get_num_sent_texts(to_number, text_body):
#     # connect to twilio account
#     client = Client(ACCOUNT_SID, AUTH_TOKEN)
    
#     # we should get all messages starting at time from last message that was sent while all messages still haven't been sent
#     messages = client.messages.list(date_sent_after=datetime.now() + timedelta(days=-1))
    
#     num_sent_texts = 0
#     for record in messages:
#         if record.to == to_number and record.body == text_body:
#             if record.status in ['sent', 'delivered']:
#                 num_sent_texts += 1

#     return num_sent_texts

        
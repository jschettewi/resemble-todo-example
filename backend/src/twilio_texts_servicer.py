import asyncio
import traceback
import todo_app.v1.todo_list_pb2
import uuid
from datetime import datetime, timedelta
from twilio.rest import Client
from todo_app.v1.twilio_texts_rsm import (
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

class TwilioTextsServicer(TwilioTexts.Interface):

    async def Create(
        self,
        context: WriterContext,
        request: CreateTwilioTextRequest,
    ) -> TwilioTexts.CreateEffects:
        # Since this is a constructor, we are setting the initial state of the
        # state machine.
        initial_state = TwilioTextsState(uniquetexts=[])

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
        # now we need to check if there are any texts that have the same 'to' and 'body'
        # if there are: increment the num_times of this text
        # else: make a new UniqueText

        print(to_number)
        print(body)
        print(create_time)

        curr_key = str(to_number) + str(body)

        key_exists_flag = False
        for utext in state.uniquetexts:
            if utext.key == curr_key:
                utext.value += 1
                key_exists_flag = True
                break
        
        if not key_exists_flag:
            # add a new key into state with value of 1
            newText = Pair(key=curr_key, value=1)
            state.uniquetexts.extend([newText])

        # TODO: fix this line
        reminder_text_task = self.schedule().ReminderTextTask(context, to='', body='', create_time='',num_times=1)
        
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
        
        # deadline = request.deadline
        # todo = request.todo
        
        # message_body = "Reminder! You have to complete task '"+todo+"' by "+deadline
        message_body = ""
        # uncomment line below to send the message in twilio
        # await send_text(message_body)

        print("Message:", message_body)

        return TwilioTexts.ReminderTextTaskEffects(
            state=state,
            response=Empty(),
        )
    
async def get_num_sent_texts(to_number, text_body):
    
    # connect to twilio account
    account_sid = 'AC03d5902ba89dd69e3a8b7dc25b61b325'
    auth_token = '0434815514287f052b857a9fcead502c'
    client = Client(account_sid, auth_token)
    
    # we should get all messages starting at time from last message that was sent while all messages still haven't been sent
    messages = client.messages.list(date_sent_after=datetime.now() + timedelta(days=-1))
    
    num_sent_texts = 0
    for record in messages:
        if False:
        # if message has been accepted
            num_sent_texts += 1

    return num_sent_texts


async def send_text(message_body: str):
    #logging.info(f"Sending text:\n====\n{message_body}\n====")
    print("We are sending a text")

    # twilio code here to send a text

    # lets send a message using twillio
    account_sid = 'AC03d5902ba89dd69e3a8b7dc25b61b325'
    auth_token = '0434815514287f052b857a9fcead502c'
    client = Client(account_sid, auth_token)

    # messages = client.messages.list(date_sent_before=datetime(2019, 3, 1, 0, 0, 0), limit=20)

    # lets get all the messages that were sent in the last 24 hours
    # then make sure we aren't sending a message that has the same body as a message we already sent

    num_sent_texts = get_num_sent_texts(to_number='+18777804236', text_body=message_body)

    # get the difference between num_sent_texts and value for the corresponding key

    # if diff = 0:
    # print("All messages have been sent")
    # if diff >0 : loop through number of times we need to send message

    # send_message = True
    # for record in messages:
    #     if record.body == message_body:
    #         send_message = False
    
    # if send_message:
    #     message = client.messages.create(body=message_body, from_='+18554612173', to='+18777804236')
    #     print(message.sid)
    # else:
    #     print("Reminder was already sent in the last 24 hours")
    
    # message = client.messages.create(body=message_body, from_='+18554612173', to='+18777804236')
    # message = client.messages.create(body=message_body, from_='+18554612173', to='+18777804236')

    #print(message.sid)
    return

        
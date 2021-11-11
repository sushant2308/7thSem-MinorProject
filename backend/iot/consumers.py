from channels.generic.websocket import AsyncWebsocketConsumer
import json 
import uuid
class IotConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        #device_uuid = self.scope['url_route']['kwargs'].get('chat_id')
        self.groupname='dashboard'
        await self.channel_layer.group_add(
            self.groupname,
            self.channel_name,
        )

        await self.accept()

    async def disconnect(self,close_code):

        await self.channel_layer.group_discard(
            self.groupname,
            self.channel_name
        )

    async def dashboard_message(self, event):
        # Send message to websocket group
        await self.send(json.dumps({
                'type': 'chat_message',
                'data': {'message':str(uuid. uuid4())}
            }))
    


    
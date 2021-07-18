import json

from typing import List
from fastapi import WebSocket
from starlette.websockets import WebSocketDisconnect

CONNECTED = 'connected'
DISCONNECTED = 'disconnected'
ACTIVE_USERS = 'active_users'

def event(event_name, data):
    return {
        'event': event_name,
        'data': data
    }


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.active_users: List[str] = []

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_users.append(user_id)
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket, user_id: str):
        self.active_users.remove(user_id)
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message):
        for connection in self.active_connections:
            await connection.send_json(message)

    async def handler(self, websocket, user_id):
        await self.connect(websocket, user_id)
        await self.send_personal_message(event(ACTIVE_USERS, self.active_users), websocket)
        await self.broadcast(event(CONNECTED, user_id))
        try:
            while True:
                data = await websocket.receive_text()
                msg = json.loads(data)
                await self.broadcast(msg)
        except WebSocketDisconnect:
            self.disconnect(websocket, user_id)
            await self.broadcast(event(DISCONNECTED, user_id))

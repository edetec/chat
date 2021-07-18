from typing import DefaultDict
from server.chat import ConnectionManager
from fastapi import FastAPI, WebSocket
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI()
rooms = DefaultDict(ConnectionManager)

@app.get('/')
async def home():
    return FileResponse('client/public/index.html')

@app.websocket("/ws/{room}/{user_id}")
async def websocket_endpoint(websocket: WebSocket, room: str, user_id: str):
    roomManager = rooms[room]
    await roomManager.handler(websocket, user_id)
    
# Place After All Other Routes
app.mount('/', StaticFiles(directory="client/public/"), name="static")

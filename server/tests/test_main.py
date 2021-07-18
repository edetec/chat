import pytest
from fastapi.testclient import TestClient
from fastapi.websockets import WebSocket


from server.main import app


@pytest.fixture
def two_sockets():
    client = TestClient(app)
    with client.websocket_connect("/ws/room1/Ana") as websocket1:
        with client.websocket_connect("/ws/room1/Maria") as websocket2:
            yield (websocket1, websocket2)


def test_websocket(two_sockets):
    (websocket1, websocket2) = two_sockets
    # client1 - connection open events
    data = websocket1.receive_json()
    assert data == {"event": "active_users", "data": ["Ana"]}
    data = websocket1.receive_json()
    assert data == {"event": "connected", "data": "Ana"}

    # client1 - receive second client connection event
    data = websocket1.receive_json()
    assert data == {"event": "connected", "data": "Maria"}
    
    # client2 - connection open event
    data = websocket2.receive_json()
    assert data == {"event": "active_users", "data": ["Ana", "Maria"]}
    data = websocket2.receive_json()
    assert data == {"event": "connected", "data": "Maria"}

    # client2 - receive typing events
    event = {"event": "typing", "data": "Ana"}
    websocket1.send_json(event)
    data = websocket2.receive_json()
    assert data == event
    event = {"event": "stop_typing", "data": "Ana"}
    websocket1.send_json(event)
    data = websocket2.receive_json()
    assert data == event

    # client2 - receive disconnected evet from client1
    websocket1.close()
    data = websocket2.receive_json()
    assert data == {"event": "disconnected", "data": "Ana"}
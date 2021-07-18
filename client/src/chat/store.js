import { writable, get } from 'svelte/store';

const wsHost = window.location.origin.replace(/^http/, 'ws');

const usernameStore = writable('');
let messageStore = writable([]);
let activeUsersStore = writable([]);
let typingStore = writable([]);
let socket;

const allowedEvents = {
	message: 'message',
	connected: 'connected',
	disconnected: 'disconnected',
	active_users: 'active_users',
	typing: 'typing',
	stop_typing: 'stop_typing'
};

const createEvent = (event, data) => {
	return JSON.stringify({ event, data });
};

const eventHandlers = {
	[allowedEvents.message]: (data) => {
		messageStore.update(messages => messages.concat(data));
	},
	[allowedEvents.connected]: (data) => {
		const username = get(usernameStore);
		if (username !== data) {
			activeUsersStore.update(users => users.concat(data).sort());
		}
		messageStore.update(messages => messages.concat({
			text: `<b>${data}</b> entrou na sala...`
		}));
	},
	[allowedEvents.disconnected]: (data) => {
		const username = get(usernameStore);
		if (username !== data) {
			activeUsersStore.update(users => users.filter(user => user !== data));
		}
		messageStore.update(messages => messages.concat({
			text: `<b>${data}</b> saiu da sala...`
		}));
	},
	[allowedEvents.active_users]: (data) => {
		activeUsersStore.set(data.sort());
	},
	[allowedEvents.typing]: (data) => {
		console.log(allowedEvents.typing, data);
		typingStore.update(users => users.concat(data));
	},
	[allowedEvents.stop_typing]: (data) => {
		console.log(allowedEvents.stop_typing, data);
		typingStore.update(users => users.filter(user => user !== data));
	}
};

const disconnect = () => {
	if (socket) {
		socket.close();
		socket = undefined;
	}
	messageStore.set([]);
	activeUsersStore.set([]);
	typingStore.set([]);
};

const connect = (room, username) => {
	disconnect();

	socket = new WebSocket(`${wsHost}/ws/${room}/${username}`);

	socket.addEventListener('open', function (event) {
		console.log(`${room}'s open`);
	});

	socket.addEventListener('message', function (message) {
		const { event, data } = JSON.parse(message.data);
		const handler = eventHandlers[event];
		if (handler) {
			handler(data);
		} else {
			console.error('Unknown event', message.data)
		}
	});
};

const changeRoom = (room) => {
	const username = get(usernameStore);
	connect(room, username);
};

const sendMessage = (msg) => {
	if (!msg || socket.readyState > 1) return;

	const evt = createEvent(allowedEvents.message, {
		author: get(usernameStore),
		text: msg
	});
	socket.send(evt);
};

const sendStartedTyping = () => {
	const evt = createEvent(allowedEvents.typing, get(usernameStore));
	socket.send(evt);
};

const sendStoppedTyping = () => {
	const evt = createEvent(allowedEvents.stop_typing, get(usernameStore));
	socket.send(evt);
};

export default {
	setUsername: usernameStore.set,
	subscribeUsername: usernameStore.subscribe,
	subscribeMessages: messageStore.subscribe,
	subscribeUsers: activeUsersStore.subscribe,
	subscribeTyping: typingStore.subscribe,
	connect,
	changeRoom,
	sendMessage,
	sendStartedTyping,
	sendStoppedTyping
}
import { readable } from 'svelte/store';
import {
	loggedUserStore,
	messageStore,
	activeUsersStore,
	typingStore,
} from './core/store';
import chatClient from './core/chat-client';

export const usernameStore = readable('', set => {
	return loggedUserStore.subscribe(({username}) => set(username));
})

export default {
	login: loggedUserStore.set,
	subscribeLoggedUser: loggedUserStore.subscribe,
	subscribeUsername: usernameStore.subscribe,
	subscribeMessages: messageStore.subscribe,
	subscribeUsers: activeUsersStore.subscribe,
	subscribeTyping: typingStore.subscribe,
	connect: chatClient.connect,
	changeRoom: chatClient.changeRoom,
	sendMessage: chatClient.sendMessage,
	sendStartedTyping: chatClient.sendStartedTyping,
	sendStoppedTyping: chatClient.sendStoppedTyping
}
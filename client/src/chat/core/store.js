import { writable } from 'svelte/store';

export const loggedUserStore = writable({});
export const messageStore = writable([]);
export const activeUsersStore = writable([]);
export const typingStore = writable([]);
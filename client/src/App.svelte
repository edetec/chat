<script>
	import { onDestroy } from "svelte";

	import Chat from "./chat/Chat.svelte";
	import store from "./chat/store";
	import LoginForm from "./LoginForm.svelte";

	let username;

	const unsubscribe = store.subscribeUsername((val) => (username = val));

	onDestroy(unsubscribe);
</script>

<main>
	{#if username}
		<Chat />
	{:else}
		<LoginForm />
	{/if}
</main>

<style>
	main {
		margin: auto;
		max-width: 90%;
		background-color: white;
		height: 90%;
		padding: 10px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
		flex: 1;
	}
</style>

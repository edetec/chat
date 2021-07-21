<script>
    import { afterUpdate, onDestroy } from "svelte";
    import Message from "./Message.svelte";
    import store from "./store";

    let messages = [];
    let unsubscribeMessages;
    const unsubscribe = store.subscribeUsername((username) => {
        store.connect("room1", username);

        if (unsubscribeMessages) {
            unsubscribeMessages();
        }
        unsubscribeMessages = store.subscribeMessages((currentMessages) => {
            messages = currentMessages;
        });
    });

    onDestroy(unsubscribe);
    let div;

    afterUpdate(() => {
        if (div) {
            div.scrollTo(0, div.scrollHeight);
        }
    });
</script>

<div id="message-container" bind:this={div}>
    {#each messages as message, i}
        <Message {message} prevMessage={messages[i - 1]} />
    {:else}
        <p>No messages</p>
    {/each}
</div>

<style>
    #message-container {
        height: calc(100% - 6em);
        width: calc(100% - 1em);
        display: inline-block;
        overflow-y: auto;
        padding: 0 10px;
    }
</style>

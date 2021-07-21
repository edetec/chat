<script>
    import store from "./store";

    let newMessage;
    let isTyping = false;

    function sendMessage() {
        if (newMessage.length < 1) return;

        store.sendMessage(newMessage);
        newMessage = "";
        notifyIsTyping(false);
    }

    function valueChange(event) {
        const newState = newMessage.length > 0;
        if (isTyping !== newState) {
            notifyIsTyping(newState);
        }
    }

    function notifyIsTyping(newState) {
        isTyping = newState;
        isTyping ? store.sendStartedTyping() : store.sendStoppedTyping();
    }
</script>

<form on:submit|preventDefault={sendMessage} id="chat-input">
    <input id="messageInput" bind:value={newMessage} on:input={valueChange} />
    <button type="submit">
        <svg viewBox="0 0 24 24">
            <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
    </button>
</form>

<style>
    #chat-input {
        width: 100%;
        padding: 5px;
        background-color: white;
    }

    #chat-input input {
        width: 85%;
        border-radius: 3px;
        border: none;
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 5px 8px;
        float: left;
    }

    #chat-input button {
        background: none;
        border: none;
        width: 15%;
        padding-top: 2px;
        margin: 0;
    }

    #chat-input button svg {
        width: 24px;
        height: 24px;
        text-align: center;
    }

    #chat-input button:hover {
        cursor: pointer;
    }

    #chat-input button:hover svg path {
        fill: #a62824;
    }
</style>

<script>
    import { onDestroy } from "svelte";

    import store from "./store";
    import UserAbout from "./UserAbout.svelte";

    let status = "";

    function getStatusMessage(usersTyping) {
        if (usersTyping.length === 0) return "";

        if (usersTyping.length === 1) {
            const [user] = usersTyping;
            return `${user} is typing...`;
        }

        const lastUser = usersTyping.pop();
        const joinned = `${usersTyping} and ${lastUser} are typing...`;
        return joinned;
    }

    const unsubiscribe = store.subscribeTyping((val) => {
        status = getStatusMessage(val);
    });
    onDestroy(() => {
        unsubiscribe();
    });
</script>

<div class="chat-header">
    <div class="status">
        {status}
    </div>
    <UserAbout />
</div>

<style>
    .chat-header {
        height: 2em;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
</style>

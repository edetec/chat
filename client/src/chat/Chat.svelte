<script>
    import ChatInput from "./ChatInput.svelte";
    import MessageList from "./MessageList.svelte";
    import Rooms from "./Rooms.svelte";
    import UserList from "./UserList.svelte";
</script>

<div id="chat-container">
    <div id="sidebar">
        <Rooms />
        <UserList />
    </div>
    <div id="content">
        <MessageList />
        <ChatInput />
    </div>
</div>

<style>
    #chat-container {
        height: 100%;
        overflow: hidden;
        position: relative;
        padding-bottom: 50px;
    }

    #sidebar {
        height: 89%;
        width: 15em;
        position: fixed !important;
        z-index: 1;
        overflow: auto;
        border-right: solid 2px rgb(138, 128, 128);
    }

    #content {
        height: 100%;
        margin-left: 16em;
    }
</style>

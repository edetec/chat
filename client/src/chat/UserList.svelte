<script>
    import { onDestroy } from "svelte";
    import store, { usernameStore } from "./store";

    let username = $usernameStore;
    let users = [];
    const unsubscribe = store.subscribeUsers((currentUsers) => {
        users = currentUsers;
    });

    onDestroy(unsubscribe);
</script>

<div id="users-container">
    <h2>Users</h2>
    {#each users as user, i}
        <div class:me={username===user}>{user}</div>
    {:else}
        <p>No users</p>
    {/each}
</div>

<style>
    #users-container {
        height: calc(100% - 3em);
        overflow-y: auto;
        padding: 0 10px;
    }

    .me {
        font-weight: bolder;
    }
</style>

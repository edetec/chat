<script>
    import store from "./chat/store";

    let username = '';

    function submitLogin(event) {
        if (!username) return;
        store.setUsername(username);
    }

</script>

<div id="login">
    <form on:submit|preventDefault="{submitLogin}">
        <label for="enter-username">Enter a username.</label>
        <input type="text" id="enter-username" bind:value={username} placeholder="Your username" />
        <button type="submit">Enter</button>
    </form>
</div>

<style>
    #login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    #login label {
        margin-bottom: 5px;
    }
</style>

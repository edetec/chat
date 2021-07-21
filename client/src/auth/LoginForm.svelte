<script>
    import store from "../chat/store";
    import SignupForm from "./SignupForm.svelte";

    let viewSignUp = false;
    let username = "";
    let email = "";
    let password = "";

    function showSignUp() {
        viewSignUp = true;
    }

    function showLogin() {
        viewSignUp = false;
    }

    function submitLogin(event) {
        if (!username) return;
        store.login({username,email,password});
    }
</script>

{#if viewSignUp}
    <SignupForm onCancel={showLogin} />
{:else}
    <div id="login">
        <h2>Login</h2>
        <form on:submit|preventDefault={submitLogin}>
            <label for="enter-username">Enter a username</label>
            <input
                type="text"
                id="enter-username"
                bind:value={username}
                placeholder="Your username"
            />
            <label for="enter-email">Enter a e-mail</label>
            <input
                type="email"
                id="enter-email"
                bind:value={email}
                placeholder="Your e-mail"
            />
            <label for="enter-password">Enter a password</label>
            <input
                type="password"
                id="enter-password"
                bind:value={password}
                placeholder="Your password"
            />

            <div class="buttons">
                <button type="submit">Enter</button>
                <button type="default" on:click={showSignUp}>Sign Up</button>
            </div>
        </form>
    </div>
{/if}

<style>
    #login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: justified;
    }

    #login label {
        margin-bottom: 5px;
    }
</style>

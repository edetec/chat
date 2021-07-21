<script>
    import store from "../chat/store";

    let username = "";
    let email = "";
    let password = "";
    let passwordConfirmation = "";
    export let onCancel;

    function submitSignUp() {
        console.log("sign up");
    }
</script>

<div id="signup">
    <h2>Sign up</h2>
    <form on:submit|preventDefault={submitSignUp}>
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
        <label for="enter-password-confirmation">Confirm your password</label>
        <input
            type="password"
            id="enter-password-confirmation"
            bind:value={passwordConfirmation}
            placeholder="Confirm your password"
        />

        <div class="buttons">
            <button type="submit">Save</button>
            <button type="cancel" on:click={onCancel}>Cancel</button>
        </div>
    </form>
</div>

<style>
    #signup {
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

    #signup label {
        margin-bottom: 5px;
    }
</style>

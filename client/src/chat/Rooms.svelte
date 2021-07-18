<script>
    import store from "./store";

    function changeRoom(event) {
        const room = event.target.value;
        store.changeRoom(room);
    }
</script>

<div>
    <label for="room"
        >Sala:
        <select name="room" on:input={changeRoom}>
            <option value="room1">Sala 1</option>
            <option value="room2">Sala 2</option>
            <option value="room3">Sala 3</option>
        </select>
    </label>
</div>

<style>
    select {
        width: 11em;
    }
</style>

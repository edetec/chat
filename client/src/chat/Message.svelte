<script>
import { onDestroy } from "svelte";

import store from "./store";


  export let message;
  export let prevMessage;
  
  let username;
  const unsubiscribe = store.subscribeUsername(val => username = val);
  onDestroy(unsubiscribe);

  function showAuthor(msg, prevMsg) {
    return !!msg.author && msg.author !== username && (!prevMsg || prevMsg.author !== msg.author);
  }
</script>

<div class="message" class:mine="{message.author === username}">
  <div class="text">
  {#if showAuthor(message, prevMessage)}
    <div class="author">{message.author}</div>
  {/if}
    {@html message.text} <br />
    <small>{new Date().toLocaleTimeString()}</small>
  </div>
</div>

<style>
  .message {
    margin: 7px 0;
  }

  .message .text {
    max-width: 60%;
    border-radius: 5px;
    padding: 5px;
    background-color: #eaeaea;
    display: inline-block;
  }

  .message.mine {
    text-align: right;
  }

  .message.mine .text {
    background-color: #a62824;
    color: white;
  }

  .message .author {
    text-align: left;
    font-size: 0.8em;
    font-weight: bolder;
    display: block;
    text-decoration: none;
  }
</style>

<script lang="ts">
  import StopIcon from "../icons/stop-icon.svelte"

  export let stop: () => void
</script>

<button on:click={stop} aria-label="stop">
  <StopIcon size="1rem" />
</button>

<style>
  button {
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border: 0;
    appearance: none;
    cursor: pointer;
    background-image: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
  }
</style>

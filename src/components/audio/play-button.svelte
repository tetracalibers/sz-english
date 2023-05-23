<script lang="ts">
  import PlayIcon from "../icons/play-icon.svelte"

  export let play: () => void
</script>

<button on:click={play} aria-label="play">
  <PlayIcon size="1rem" />
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
    padding: 0;
    background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);
    appearance: none;
    cursor: pointer;
  }
</style>

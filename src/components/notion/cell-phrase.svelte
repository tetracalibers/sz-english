<script lang="ts">
  import { Speaker } from "@/lib/speaker"
  import RichText from "./rich-text.svelte"
  import type { RichTextItem } from "@/types/notion"
  import PlayButton from "../audio/play-button.svelte"

  export let richtexts: RichTextItem[]

  const phraseList = richtexts.map((item) => item.plain_text)
  const speaker = new Speaker(phraseList.join(" "))
</script>

<div class="cell">
  <PlayButton play={speaker.speak} />
  {#each richtexts as item}
    <RichText richtext={item} />
  {/each}
</div>

<style>
  .cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cell :global(> button) {
    scale: 0.7;
  }
</style>

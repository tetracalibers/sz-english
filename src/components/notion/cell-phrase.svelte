<script lang="ts">
  import { Speaker } from "@/lib/speaker"
  import RichText from "./rich-text.svelte"
  import PlayButton from "../audio/play-button.svelte"
  import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

  export let richtexts: RichTextItemResponse[]

  const phraseList = richtexts.map((item) => item.plain_text)
  const speaker = new Speaker(phraseList.join(" "))
</script>

<div class="cell">
  <PlayButton play={speaker.speak} />
  <div class="text">
    {#each richtexts as item}
      <RichText richtext={item} />
    {/each}
  </div>
</div>

<style>
  .cell {
    display: contents;
  }

  .cell :global(> button) {
    scale: 0.7;
    flex-shrink: 0;
  }

  .text {
    white-space: nowrap;
  }
</style>

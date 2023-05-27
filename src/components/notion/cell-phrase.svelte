<script lang="ts">
  import RichText from "./rich-text.svelte"
  import PlayButton from "../audio/play-button.svelte"
  import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import { GlobalSpeaker } from "@/lib/svelte-speaker"

  export let richtexts: RichTextItemResponse[]
  export let speaker: GlobalSpeaker

  const phraseList = richtexts.map((item) => item.plain_text)
  const play = () => speaker.speak(phraseList.join(" "))
</script>

<div class="cell">
  <PlayButton {play} />
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

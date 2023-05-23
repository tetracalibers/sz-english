<script lang="ts">
  import { RichTextItemResponse, ToggleBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"
  import { Speaker } from "@/lib/speaker"
  import PlayButton from "../audio/play-button.svelte"
  import StopButton from "../audio/stop-button.svelte"
  import TriangleDownIcon from "../icons/triangle-down-icon.svelte"

  type Content = {
    rich_text: RichTextItemResponse[]
    color: ToggleBlockObjectResponse["toggle"]["color"]
    children: {
      type: string
      paragraph: {
        rich_text: RichTextItemResponse[]
        color: string
      }
    }[]
  }

  export let content: Content

  const en = content.rich_text
  const ja = content.children.flatMap((item) => item?.paragraph?.rich_text).filter(Boolean)

  const phraseList = en.map((item) => item.plain_text)
  const speaker = new Speaker(phraseList.join(" "))
</script>

<details>
  <summary>
    <div class="toggle-marker">
      <TriangleDownIcon size="0.6rem" />
    </div>
    <div class="buttons">
      <PlayButton play={speaker.speak} />
      <StopButton stop={speaker.stop} />
    </div>
    <div>
      {#each en as item}
        <RichText richtext={item} />
      {/each}
    </div>
  </summary>
  <div class="inner">
    {#each ja as item}
      <RichText richtext={item} />
    {/each}
  </div>
</details>

<style>
  details {
    padding-inline: 2rem;
  }

  summary {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  details[open] .toggle-marker {
    rotate: 0deg;
  }

  details:not([open]) .toggle-marker {
    rotate: 270deg;
  }

  .buttons {
    display: flex;
    gap: 5px;
    scale: 0.7;
  }

  .buttons :global(> button) {
    border-radius: 3px;
    rotate: 45deg;
  }

  .buttons :global(> button > *) {
    rotate: -45deg;
  }

  .inner {
    padding-inline-start: 5rem;
    padding-inline-end: 1rem;
    padding-block-start: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }
</style>

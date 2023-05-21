<script lang="ts">
  import { CalloutBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
  import { Speaker } from "@/lib/speaker"
  import RichText from "./rich-text.svelte"
  import type { RichTextItem } from "@/types/notion"
  import StopButton from "../audio/stop-button.svelte"
  import PlayButton from "../audio/play-button.svelte"
  import BirdIcon from "../icons/bird-icon.svelte"

  type Content = {
    rich_text: RichTextItem[]
    color: CalloutBlockObjectResponse["callout"]["color"]
    children?: {
      type: string
      paragraph: {
        rich_text: RichTextItem[]
        color: string
      }
    }[]
  }

  export let content: Content

  const children = content.children ?? []
  const childrenPhrases = children.map((item) => item.paragraph.rich_text)

  const phrases = content.rich_text.concat(childrenPhrases.flat())

  const phraseList = phrases.map((item) => item.plain_text)
  const speaker = new Speaker(phraseList.join(" "))
</script>

<div>
  <div class="separator">
    <div class="separator-icon">
      <BirdIcon size="3rem" />
    </div>
  </div>
  <div class="callout">
    <div class="buttons">
      <PlayButton play={speaker.speak} />
      <StopButton stop={speaker.stop} />
    </div>
    <div class="sentences">
      <p>
        {#each content.rich_text as item}
          <RichText richtext={item} />
        {/each}
      </p>
      {#each childrenPhrases as child}
        <p>
          {#each child as item}
            <RichText richtext={item} />
          {/each}
        </p>
      {/each}
    </div>
  </div>
</div>

<style>
  .separator {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 1rem;
    margin-inline: -1rem;
  }

  .separator-icon {
    flex-shrink: 0;
  }

  .separator::before,
  .separator::after {
    content: "";
    height: 1.5px;
    background-color: currentColor;
    width: 100%;
  }

  .callout {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;
    font-size: 1.25rem;

    --inset: 0.5rem;
    --border-height: 1px;
    --border-color: currentColor;
    padding-inline: calc(1rem + var(--inset));
    position: relative;
    border-block: var(--border-height) solid var(--border-color);
  }

  .callout::before,
  .callout::after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--inset));
    width: var(--border-height);
    height: calc(100% + 2 * var(--inset));
    background-color: var(--border-color);
  }

  .callout::before {
    left: var(--inset);
  }

  .callout::after {
    right: var(--inset);
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .buttons :global(> button) {
    border-radius: 999px;
    width: 2rem;
    height: 2rem;
  }

  .sentences {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  p {
    margin: 0;
    text-align: center;
  }
</style>

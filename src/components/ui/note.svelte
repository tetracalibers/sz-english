<script lang="ts">
  import {
    isCallout,
    isHeading2,
    isHeading3,
    isJaToggle,
    isParagraph,
    isQuote,
    isTable,
    isToggle
  } from "@/lib/notion/validate-block"
  import CalloutPhrase from "../notion/callout-phrase.svelte"
  import JaToggle from "../notion/ja-toggle.svelte"
  import Paragraph from "../notion/paragraph.svelte"
  import Heading2 from "../notion/heading2.svelte"
  import Heading3 from "../notion/heading3.svelte"
  import TogglePhrase from "../notion/toggle-phrase.svelte"
  import Quote from "../notion/quote.svelte"
  import Table from "../notion/table.svelte"
  import SelectVoice from "./select-voice.svelte"
  import { GlobalSpeaker } from "@/lib/svelte-speaker"
  import Drawer from "./drawer.svelte"

  export let blocks: Record<string, unknown>[]

  const speaker = new GlobalSpeaker()
</script>

<Drawer><SelectVoice {speaker} /></Drawer>

{#each blocks as block}
  {#if isCallout(block)}
    <CalloutPhrase {speaker} content={block.callout} />
  {:else if isJaToggle(block)}
    <JaToggle content={block.toggle.children} />
  {:else if isToggle(block)}
    <TogglePhrase {speaker} content={block.toggle} />
  {:else if isParagraph(block)}
    <Paragraph content={block.paragraph} />
  {:else if isQuote(block)}
    <Quote content={block.quote} />
  {:else if isHeading2(block)}
    <Heading2 content={block.heading_2} id={block.id} />
  {:else if isHeading3(block)}
    <Heading3 content={block.heading_3} />
  {:else if isTable(block)}
    <Table {speaker} content={block.table} />
  {/if}
{/each}

<script lang="ts">
  import { RichTextItem } from "@/types/notion"
  import { QuoteBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    rich_text: RichTextItem[]
    color: QuoteBlockObjectResponse["quote"]["color"]
  }

  export let content: Content
</script>

<blockquote>
  {#each content.rich_text as item}
    <RichText richtext={item} />
  {/each}
</blockquote>

<style>
  blockquote {
    margin-block: 0;
    margin-inline-start: 2rem;
    margin-inline-end: 1rem;
    padding: 1rem;
    box-shadow: 10px 0px 2px -10px currentColor inset;
  }
</style>

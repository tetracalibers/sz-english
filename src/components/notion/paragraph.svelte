<script lang="ts">
  import { RichTextItem } from "@/types/notion"
  import { ParagraphBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    rich_text: RichTextItem[]
    color: ParagraphBlockObjectResponse["paragraph"]["color"]
  }

  export let content: Content
</script>

<p>
  {#each content.rich_text as item}
    <RichText richtext={item} />
  {/each}
</p>

<style>
  p {
    margin: 0;
    text-indent: 1rem;
  }
</style>

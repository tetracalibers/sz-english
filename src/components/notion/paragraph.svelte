<script lang="ts">
  import { ParagraphBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    rich_text: RichTextItemResponse[]
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

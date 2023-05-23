<script lang="ts">
  import { Heading3BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    rich_text: RichTextItemResponse[]
    color: Heading3BlockObjectResponse["heading_3"]["color"]
  }

  export let content: Content
</script>

<h3>
  {#each content.rich_text as item}
    <RichText richtext={item} />
  {/each}
</h3>

<style>
  h3 {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    margin: 0;
    padding: 0.8em 0;
  }

  h3::before {
    content: "###";
    font-size: 1.2em;
  }
</style>

<script lang="ts">
  import { Heading2BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    rich_text: RichTextItemResponse[]
    color: Heading2BlockObjectResponse["heading_2"]["color"]
  }

  export let content: Content
</script>

<h2>
  {#each content.rich_text as item}
    <RichText richtext={item} />
  {/each}
</h2>

<style>
  h2 {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    margin: 0;
    padding: 0.8em 0;
  }

  h2::before {
    content: "##";
    font-size: 1.2em;
  }
</style>

<script lang="ts">
  import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import RichText from "./rich-text.svelte"

  type Content = {
    type: string
    paragraph?: {
      rich_text: RichTextItemResponse[]
      color: string
    }
  }[]

  export let content: Content

  const items = content.flatMap((item) => item?.paragraph?.rich_text).filter(Boolean)
</script>

<details>
  <summary>日本語訳</summary>
  <div class="inner">
    {#each items as item}
      <RichText richtext={item} />
    {/each}
  </div>
</details>

<style>
  details {
    text-indent: 1rem;
    text-align: center;
    padding: 0.5rem 0;
  }

  summary {
    font-size: 0.8rem;
  }

  .inner {
    padding-inline-start: 1.5rem;
    padding-inline-end: 1rem;
    padding-block-start: 0.5rem;
    text-indent: 0;
  }
</style>

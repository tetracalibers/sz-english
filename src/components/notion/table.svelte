<script lang="ts">
  import RichText from "./rich-text.svelte"
  import CellPhrase from "./cell-phrase.svelte"
  import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
  import { GlobalSpeaker } from "@/lib/svelte-speaker"

  type Content = {
    table_width: number
    children: {
      type: string
      table_row: {
        cells: RichTextItemResponse[][]
      }
    }[]
  }

  export let content: Content
  export let speaker: GlobalSpeaker

  const rows = content.children.map((ch) => ch.table_row)
</script>

<dl class="record-list">
  {#each rows as row}
    <div class="record">
      <dt class="key">
        <CellPhrase {speaker} richtexts={row.cells[0]} />
      </dt>
      <dd class="value">
        {#each row.cells[1] as item}
          <RichText richtext={item} />
        {/each}
      </dd>
    </div>
  {/each}
</dl>

<style>
  .record {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    border-bottom: 1px dashed #7c96ab;
  }

  .record-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    padding: 0.5rem 1rem;
  }

  .record > * {
    box-sizing: border-box;
  }

  .key {
    line-height: 2;
    display: contents;
  }

  .value {
    margin: 0;
    margin-inline-start: auto;
    font-size: 0.9rem;
  }
</style>

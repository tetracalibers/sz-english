<script lang="ts">
  import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

  export let richtext: RichTextItemResponse
</script>

<span
  class={"color--" + richtext.annotations.color}
  class:bold={richtext.annotations.bold}
  class:italic={richtext.annotations.italic}
  class:underline={richtext.annotations.underline}
>
  {richtext.plain_text}
</span>

<style>
  .color--pink {
    color: #f266ab;
  }

  .color--purple {
    color: #aa77ff;
  }

  .color--blue {
    color: #3ab0ff;
  }

  .color-green {
    color: #6bcb77;
  }

  .color-orange {
    color: #f99b7d;
  }

  .color-yellow {
    color: #fbc252;
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .underline {
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }
</style>

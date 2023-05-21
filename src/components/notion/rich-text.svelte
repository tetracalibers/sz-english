<script lang="ts">
  import type { RichTextItem } from "@/types/notion"

  export let richtext: RichTextItem
</script>

<span
  class={"color--" + richtext.annotations.color}
  class:bold={richtext.annotations.bold}
  class:italic={richtext.annotations.italic}
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
</style>

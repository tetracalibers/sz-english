<script lang="ts">
  import type { CSSLength } from "@/types/css-value"

  export let size: CSSLength = "24px"
</script>

<svg style:--size={size} xmlns="http://www.w3.org/2000/svg" viewBox="7 8 8 6"
  ><path fill="currentColor" d="m15 8l-4.03 6L7 8h8z" /></svg
>

<style>
  svg {
    width: var(--size);
    height: var(--size);
  }
</style>

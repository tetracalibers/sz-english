<script lang="ts">
  import type { CSSLength } from "@/types/css-value"

  export let size: CSSLength = "24px"
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style:--size={size}>
  <path
    d="M17.13 7.97941C20.96 10.1894 20.96 13.8094 17.13 16.0194L14.04 17.7994L10.95 19.5794C7.13 21.7894 4 19.9794 4 15.5594V11.9994V8.43941C4 4.01941 7.13 2.20941 10.96 4.41941L13.21 5.71941"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-miterlimit="10"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style>
  svg {
    width: var(--size);
    height: var(--size);
  }
</style>

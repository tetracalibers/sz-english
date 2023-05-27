<script lang="ts">
  import { onMount } from "svelte/internal"
  import NightVisionIcon from "../icons/night-vision-icon.svelte"

  let root: HTMLElement
  let body: HTMLElement
  let transitionWrapper: HTMLElement

  let opened = false
  const toggle = () => (opened = !opened)

  // 背景スクロールの禁止切り替え
  const scrollLockModifier = "scroll-lock"
  const activeScrollLock = () => {
    root?.classList.add(scrollLockModifier)
    body?.classList.add(scrollLockModifier)
  }
  const deactiveScrollLock = () => {
    root?.classList.remove(scrollLockModifier)
    body?.classList.remove(scrollLockModifier)
  }
  // 開閉時に切り替え実行
  $: opened ? activeScrollLock() : deactiveScrollLock()

  onMount(() => {
    root = document.documentElement
    body = document.body

    /** 背景スクロールの禁止 */
    // const onTransitionDrawer = (e: TransitionEvent) => {
    //   if (e.target === transitionWrapper) return
    //   if (e.propertyName === "visibility") return

    //   !opened && deactiveScrollLock()
    // }
    // transitionWrapper.addEventListener("transitionend", onTransitionDrawer, false)
  })
</script>

<div class="trigger">
  <button class="trigger-button" type="button" on:click={toggle} aria-expanded={opened} aria-controls="drawer">
    <NightVisionIcon size="2rem" />
  </button>
</div>

<div bind:this={transitionWrapper}>
  <div class="drawer" id="drawer" aria-expanded={opened}>
    <div class="content"><slot /></div>
  </div>
  <div class="backdrop" />
</div>

<style>
  .trigger-button {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;

    transition-property: color;
  }

  .trigger-button[aria-expanded="false"] {
    color: #146c94;
    /** 閉じるとき */
    transition-duration: 0.6s;
    transition-delay: 0.3s;
  }

  .trigger-button[aria-expanded="true"] {
    color: #feff86;
    /** 開くとき */
    transition-duration: 0.6s;
    transition-delay: 0s;
  }

  /** Scroll Lock */
  :global(.scroll-lock) {
    overflow: hidden;
  }

  /** Layout */

  .trigger {
    position: fixed;
    z-index: 9999; /*ボタンを最前面に*/
    top: 10px;
    left: 10px;
  }

  .drawer {
    position: fixed;
    top: 0;
    z-index: 9998;
    left: 0;
    right: 0;
    height: 100%;
    padding: 4rem 2rem;
    box-sizing: border-box;
  }

  .backdrop {
    position: fixed;
    z-index: 9997;
    background-color: #7286d3;
  }

  .content {
    overflow: auto;
  }

  /** 開閉アニメーション */
  .drawer[aria-expanded] {
    transition-property: visibility, opacity;
  }
  .drawer[aria-expanded] ~ .backdrop {
    transition-duration: 0.6s;
  }

  .drawer[aria-expanded="true"] {
    transition-duration: 1s;
    transition-delay: 0.2s;
    visibility: visible;
    opacity: 1;
  }
  .drawer[aria-expanded="false"] {
    transition-duration: 0s;
    transition-delay: 0s;
    visibility: hidden;
    opacity: 0;
  }

  /** 円が広がる（共通） */
  .drawer[aria-expanded] ~ .backdrop {
    --circle-size: 100px;
    --circle-half-size-negative: -50px;
    transition-property: transform;
    width: var(--circle-size);
    height: var(--circle-size);
    border-radius: 50%;
  }
  .drawer[aria-expanded="true"] ~ .backdrop {
    transform: scale(50);
  }
  .drawer[aria-expanded="false"] ~ .backdrop {
    transform: scale(0);
  }

  /** 左上から円が広がる */
  .drawer[aria-expanded] ~ .backdrop {
    left: var(--circle-half-size-negative);
    top: var(--circle-half-size-negative);
  }
</style>

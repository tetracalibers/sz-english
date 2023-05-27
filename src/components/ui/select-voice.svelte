<script lang="ts">
  import { GlobalSpeaker } from "@/lib/svelte-speaker"

  export let speaker: GlobalSpeaker

  let selected = null
  let voices = []
  let opened = false

  const toggle = () => (opened = !opened)
  const close = () => (opened = false)

  const select = (name: string) => {
    speaker.voice = name
    close()
  }

  speaker.$currentVoice.subscribe((_voice) => {
    selected = _voice?.name
  })

  speaker.$voices.subscribe((_voices) => {
    voices = _voices
  })
</script>

<div class="CustomSelect">
  <h2 class="Title">Voice</h2>
  <button
    class="ViewOptionsTrigger"
    on:click={toggle}
    type="button"
    role="combobox"
    aria-expanded={opened}
    aria-controls="voice-select-list-box"
  >
    {selected ?? "select"}
  </button>
  <ul class="OptionsList" class:expaned={opened} id="voice-select-list-box" role="listbox">
    {#each voices as voice}
      <li role="none">
        <button
          on:click={() => select(voice.name)}
          type="button"
          value={voice.name}
          tabindex="-1"
          role="option"
          aria-selected={selected === voice.name}
        >
          {voice.name}
        </button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .CustomSelect {
    --white: #f9f9f9;
    --shadow-color: #b7cadb;

    font-family: var(--num-font) var(--ja-font);
    color: #6e85b7;
  }

  .Title {
    margin: 0;
    color: var(--white);
    font-weight: normal;
  }

  .ViewOptionsTrigger {
    appearance: none;
    background: #f9f9f9;
    border: 0;
    width: 100%;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: inherit;
    color: inherit;
    font-size: 1.5rem;
  }

  .OptionsList {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 10rem;
    overflow-y: auto;

    /* scroll hint */
    background: linear-gradient(var(--white) 33%, rgba(255, 255, 255, 0)),
      linear-gradient(rgba(255, 255, 255, 0), var(--white) 66%) 0 100%,
      radial-gradient(farthest-side at 50% 0, var(--shadow-color), rgba(255, 255, 255, 0)),
      radial-gradient(farthest-side at 50% 100%, var(--shadow-color), rgba(255, 255, 255, 0)) 0 100%;
    background-color: var(--white);
    background-repeat: no-repeat;
    background-attachment: local, local, scroll, scroll;
    background-size: 100% 33px, 100% 33px, 100% 11px, 100% 11px;
  }

  .OptionsList > li {
    padding: 0;
  }

  .OptionsList > li > button {
    appearance: none;
    background: transparent;
    border: 0;
    width: 100%;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: 1.2rem;
  }

  /** 開閉 */

  .OptionsList {
    visibility: hidden;
    height: 0;
    margin-block-start: 0;
    padding: 0;
  }

  .OptionsList.expaned {
    visibility: visible;
    height: fit-content;
    margin-block-start: 0.5rem;
    padding-block: 0.5rem;
  }
</style>

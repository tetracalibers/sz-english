import { onMount } from "svelte/internal"
import { Writable, get, writable } from "svelte/store"

interface SpeakerOption {
  rate?: number
}

const defaultSpeakerOption: SpeakerOption = {
  rate: 0.7
}

export class GlobalSpeaker {
  private audio: SpeechSynthesisUtterance
  private _$currVoice: Writable<SpeechSynthesisVoice>
  private _$voices: Writable<SpeechSynthesisVoice[]> = writable([])

  constructor(option: SpeakerOption = defaultSpeakerOption) {
    this._$voices = writable([])
    this._$currVoice = writable(null)
    onMount(() => {
      this.audio = new SpeechSynthesisUtterance()
      this.audio.lang = "en-US"
      this.audio.rate = option.rate

      const loadFn = () => {
        const voices = speechSynthesis.getVoices().filter((voice) => {
          return voice.lang === "en-US" || voice.name === "Kyoko"
        })
        const defaultVoice = voices.find((voice) => voice.name === "Google US English")
        this.audio.voice = defaultVoice
        this._$currVoice.set(defaultVoice)
        this._$voices.set(voices)
      }
      loadFn()
      window.speechSynthesis.addEventListener("voiceschanged", () => loadFn())
    })
  }

  get $voices() {
    return this._$voices
  }

  get $currentVoice() {
    return this._$currVoice
  }

  set voice(name: string) {
    const voices = get(this._$voices)
    const voice = voices.find((voice) => voice.name === name)
    this.audio.voice = voice
    this._$currVoice.set(voice)
  }

  set rate(rate: number) {
    this.audio.rate = rate
  }

  speak(text: string) {
    this.audio.text = text
    window.speechSynthesis.speak(this.audio)
  }

  stop() {
    window.speechSynthesis.cancel()
  }
}

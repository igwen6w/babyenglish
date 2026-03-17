// Web Speech API 发音工具

let voices: SpeechSynthesisVoice[] = []
let voicesLoaded = false

// 加载语音列表
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (voicesLoaded && voices.length) return resolve(voices)
    const synth = window.speechSynthesis
    const list = synth.getVoices()
    if (list.length) {
      voices = list
      voicesLoaded = true
      return resolve(voices)
    }
    synth.addEventListener('voiceschanged', () => {
      voices = synth.getVoices()
      voicesLoaded = true
      resolve(voices)
    })
    // 超时兜底
    setTimeout(() => resolve(synth.getVoices()), 1000)
  })
}

// 获取英文语音
async function getEnglishVoice(): Promise<SpeechSynthesisVoice | undefined> {
  const list = await loadVoices()
  return (
    list.find((v) => v.lang === 'en-US' && v.localService) ||
    list.find((v) => v.lang === 'en-US') ||
    list.find((v) => v.lang.startsWith('en'))
  )
}

// 发音函数
export async function speak(text: string, rate = 0.8) {
  // 取消正在播放的语音
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  utterance.pitch = 1.1

  const voice = await getEnglishVoice()
  if (voice) utterance.voice = voice

  return new Promise<void>((resolve) => {
    utterance.onend = () => resolve()
    utterance.onerror = () => resolve()
    window.speechSynthesis.speak(utterance)
  })
}

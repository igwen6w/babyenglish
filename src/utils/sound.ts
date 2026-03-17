// 音效系统 - 使用 Web Audio API 生成简单音效（不依赖外部文件）

let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

/** 正确音效：上升音调（叮~） */
export function playCorrect() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523, ctx.currentTime) // C5
    osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.15) // G5
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  } catch {}
}

/** 错误音效：下降音调（嗡~） */
export function playWrong() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(300, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.2)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.3)
  } catch {}
}

/** 完成音效：胜利旋律 */
export function playComplete() {
  try {
    const ctx = getCtx()
    const notes = [523, 659, 784, 1047] // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      const t = ctx.currentTime + i * 0.15
      osc.frequency.setValueAtTime(freq, t)
      gain.gain.setValueAtTime(0.3, t)
      gain.gain.linearRampToValueAtTime(0, t + 0.3)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.3)
    })
  } catch {}
}

/** 点击音效：轻微点击声 */
export function playClick() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch {}
}

/** 星星音效 */
export function playStar() {
  try {
    const ctx = getCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(1200, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(1600, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15)
    osc.connect(gain).connect(ctx.destination)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch {}
}

let canvasMod: any
try {
  canvasMod = require('canvas')
} catch {
  console.warn('[polyfill] canvas not installed/built -> styled QR disabled.')
}

if (!(globalThis as any).window) (globalThis as any).window = globalThis
if (!(globalThis as any).self) (globalThis as any).self = globalThis

if (canvasMod) {
  const { createCanvas, Image, loadImage } = canvasMod
  if (!(globalThis as any).document) {
    (globalThis as any).document = {
      createElement: (tag: string) => (tag === 'canvas' ? createCanvas(300, 300) : {}),
    }
  }
  const c = createCanvas(1, 1)
  ;(globalThis as any).HTMLCanvasElement = (c as any).constructor
  ;(globalThis as any).CanvasRenderingContext2D = (c.getContext('2d') as any).constructor
  ;(globalThis as any).Image = Image
  ;(globalThis as any).loadImage = loadImage
} else {
  if (!(globalThis as any).document) {
    (globalThis as any).document = { createElement: () => ({}) }
  }
}
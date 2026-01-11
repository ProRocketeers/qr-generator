if (!(globalThis as any).window) (globalThis as any).window = globalThis
if (!(globalThis as any).self) (globalThis as any).self = globalThis
if (!(globalThis as any).document) {
  ;(globalThis as any).document = {
    createElement: () => ({}),
  }
}

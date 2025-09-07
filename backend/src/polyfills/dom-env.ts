import { Window } from 'happy-dom'

if (!(globalThis as any).window) {
  const win = new Window()

  // Helper pro bezpečné nastavení globální vlastnosti
  function setGlobal(name: string, value: any) {
    if (!(name in globalThis)) {
      Object.defineProperty(globalThis, name, {
        value,
        writable: false,
        enumerable: false,
        configurable: true,
      })
    }
  }

  // Základní objekty
  setGlobal('window', win)
  setGlobal('self', win)
  setGlobal('document', win.document)
  setGlobal('HTMLElement', win.HTMLElement)
  setGlobal('SVGElement', (win as any).SVGElement || win.HTMLElement)
  setGlobal('Node', win.Node)

  // navigator (jen pokud není)
  setGlobal('navigator', win.navigator)

  // getComputedStyle stub (happy-dom má, ale pro jistotu)
  if (!(globalThis as any).getComputedStyle) {
    setGlobal('getComputedStyle', () => ({}))
  }

  // createElementNS fallback pokud by knihovna volala
  if (!(win.document as any).createElementNS) {
    ;(win.document as any).createElementNS = (_ns: string, tag: string) => win.document.createElement(tag)
  }

  // requestAnimationFrame stub (někdy vyžadováno)
  if (!(globalThis as any).requestAnimationFrame) {
    setGlobal('requestAnimationFrame', (cb: Function) => setTimeout(() => cb(Date.now()), 16))
  }
  if (!(globalThis as any).cancelAnimationFrame) {
    setGlobal('cancelAnimationFrame', (id: any) => clearTimeout(id))
  }
}

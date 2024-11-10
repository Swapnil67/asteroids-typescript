export enum Key {
  Space = 'Space',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ShiftLeft = 'ShiftLeft',
}
export class Keyboard {
  private static reservedKeys = new Set(Object.values(Key))

  private downKeys: Set<Key>
  constructor(window: Window) {
    this.downKeys = new Set()
    window.addEventListener('keydown', (e) => this.handleKeyPress(e))
    window.addEventListener('keyup', (e) => this.handleKeyPress(e))
  }

  private handleKeyPress(e: KeyboardEvent): void {
    const key = e.code as Key
    console.log('e ', e.type, key)

    if (!Keyboard.reservedKeys.has(key)) {
      return
    }

    e.preventDefault()


    if (e.type === 'keydown') {
      this.downKeys.add(key)
      console.log(e.type, ' => ', this.downKeys)
    } else if (e.type === 'keyup') {
      this.downKeys.delete(key)
      console.log(e.type, ' => ', this.downKeys)
    }
  }

  public isKeyDown(key: Key): boolean {
    return this.downKeys.has(key)
  }
}

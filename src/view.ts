const canvas = document.querySelector<HTMLCanvasElement>('#game')!
const ctx = canvas.getContext('2d')!

const WIDTH = canvas.width
const HEIGHT = canvas.height

export { ctx, WIDTH, HEIGHT }

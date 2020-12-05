let start: undefined | number
export default function rafAdapter(config: any) {
  const { timestamp, delay, callback } = config
  if (start === undefined) {
    start = timestamp
  }

  const elapsed = timestamp - start!

  if (elapsed < delay) {
    window.requestAnimationFrame(callback)
  }
}

export function warn(msg: string) {
  console.warn(
    `\x1b[1m\x1b[35m[countdown]\x1b[0m\x1b[35m ${msg}\x1b[0m\n`
  )
}
export function randomInt() {
  return crypto
    .getRandomValues(new Uint8Array(4))
    .reduce((acc, byte) => {
      const str = byte.toString().padStart(3, "0")
      return acc + str
    }, "")
    .slice(0, 6)
}

import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto"

const ITERATIONS = 310000
const KEY_LENGTH = 32
const DIGEST = "sha256"

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex")
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex")

  return `${ITERATIONS}:${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string) {
  const [iterations, salt, hash] = storedHash.split(":")

  if (!iterations || !salt || !hash) {
    return false
  }

  const calculated = pbkdf2Sync(
    password,
    salt,
    Number(iterations),
    KEY_LENGTH,
    DIGEST,
  )
  const expected = Buffer.from(hash, "hex")

  return expected.length === calculated.length && timingSafeEqual(expected, calculated)
}

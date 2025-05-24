/**
 * Set a value in the KV namespace with optional expiration.
 */
export async function set(
  kv: KVNamespace,
  key: string,
  value: string,
  expirationTime?: number
) {
  await kv.put(key, value, { expirationTtl: expirationTime })
}

/**
 * Get a value from the KV namespace.
 */
export async function get(
  kv: KVNamespace,
  key: string
): Promise<string | null> {
  return kv.get(key)
}

/**
 * Delete a key from the KV namespace.
 */
export async function deleteKey(kv: KVNamespace, key: string) {
  await kv.delete(key)
}

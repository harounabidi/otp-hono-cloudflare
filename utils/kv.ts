export async function set(
  kv: KVNamespace,
  key: string,
  value: string,
  expirationTime?: number
) {
  kv.put(key, value, { expirationTtl: expirationTime })
}

export async function get(
  kv: KVNamespace,
  key: string
): Promise<string | null> {
  return kv.get(key)
}

export async function dele(kv: KVNamespace, key: string) {
  await kv.delete(key)
}

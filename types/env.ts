export interface Env {
  KV: KVNamespace
  NEXT_PUBLIC_ZEPTOMAIL_API_URL: string
  NEXT_PUBLIC_ZEPTOMAIL_TOKEN: string
  NEXT_PUBLIC_ZEPTOMAIL_FROM: string
  JWT_SECRET: string
  NODE_ENV: string
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
}

export interface Env {
  KV: KVNamespace
  ZEPTOMAIL_API_URL: string
  ZEPTOMAIL_TOKEN: string
  ZEPTOMAIL_FROM: string
  JWT_SECRET: string
  NODE_ENV: string
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
}

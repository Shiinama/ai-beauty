namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_BASE_URL: string
  }
}

interface CloudflareEnv {
  DB: D1Database
  KV: KVNamespace
  AI: Ai
  OPENAI_API_KEY: string
}

type Env = CloudflareEnv

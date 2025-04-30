import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export const createKV = () => getRequestContext().env.KV

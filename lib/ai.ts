import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

export const createAI = () => getRequestContext().env.AI

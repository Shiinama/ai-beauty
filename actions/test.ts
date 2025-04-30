'use server'

import { createDb } from '@/lib/db'
import { users } from '@/lib/db/schema'

export async function getUsersTest() {
  const db = createDb()
  const data = await db.select().from(users)
  return data
}

export async function getTableSchemas() {
  const db = createDb()

  const tables = await db.run(`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`)

  return tables
}

import Database from 'better-sqlite3'
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import { env } from "cloudflare:workers";

import * as schema from './schema.ts'


export const createDb = () => {
  const database = env.DATABASE_BIND
  
  if (database) {
    return drizzleD1(database, { schema })
  }

  const sqlitePath = process.env.DATABASE_URL
  if (!sqlitePath) {
    throw new Error('Missing DATABASE_BIND and DATABASE_URL')
  }

  return drizzleSqlite(new Database(sqlitePath), { schema })
}

import { drizzle } from 'drizzle-orm/d1'

import * as schema from './schema.ts'

type D1Database = Parameters<typeof drizzle>[0]

export const createDb = (database: D1Database) => drizzle(database, { schema })

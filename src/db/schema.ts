import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
export * from './auth-schema'


export const todos = sqliteTable('todos', {
  id: integer({ mode: 'number' }).primaryKey({
    autoIncrement: true,
  }),
  title: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
})

export const newsletterSubscriptions = sqliteTable('newsletter_subscriptions', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
})

export const contactSubmissions = sqliteTable('contact_submissions', {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull(),
  subject: text().notNull(),
  message: text().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(unixepoch())`,
  ),
})

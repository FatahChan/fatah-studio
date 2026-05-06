import { createFileRoute } from '@tanstack/react-router'
import { createDb } from '#/db'
import { todos } from '#/db/schema'

export const Route = createFileRoute('/api/todos')({
  server: {
    handlers: {
      GET: async () => {
        const db = createDb()
        const rows = await db.select().from(todos).orderBy(todos.id)
        return Response.json(rows)
      },
      POST: async (ctx) => {
        const { request } = ctx
        const payload = (await request.json()) as { title?: string }
        const title = payload.title?.trim()
        if (!title) {
          return Response.json({ error: 'Title is required' }, { status: 400 })
        }

        let db: ReturnType<typeof createDb>
        try {
          db = createDb()
        } catch (error) {
          console.error('Error creating database', error)
          return Response.json({ error: 'Failed to create database' }, { status: 500 })
        }
        console.log('Database created')
        await db.insert(todos).values({ title })
        console.log('Todo inserted')
        return Response.json({ ok: true }, { status: 201 })
      },
    },
  },
})

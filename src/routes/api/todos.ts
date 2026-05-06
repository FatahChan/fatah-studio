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

        const db = createDb()
        await db.insert(todos).values({ title })

        return Response.json({ ok: true }, { status: 201 })
      },
    },
  },
})

import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { createDb } from '@/db'
import { newsletterSubscriptions } from '@/db/schema'

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please enter a valid email.'),
})

export const Route = createFileRoute('/api/newsletter')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown
        try {
          payload = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = subscribeSchema.safeParse(payload)
        if (!parsed.success) {
          const message =
            parsed.error.issues[0]?.message ?? 'Invalid email address.'
          return Response.json({ error: message }, { status: 400 })
        }

        let db: ReturnType<typeof createDb>
        try {
          db = createDb()
        } catch (error) {
          console.error('newsletter: failed to create db', error)
          return Response.json(
            { error: 'Could not subscribe right now.' },
            { status: 500 },
          )
        }

        try {
          await db
            .insert(newsletterSubscriptions)
            .values({ email: parsed.data.email })
            .onConflictDoNothing()
        } catch (error) {
          console.error('newsletter: insert failed', error)
          return Response.json(
            { error: 'Could not subscribe right now.' },
            { status: 500 },
          )
        }

        return Response.json({ ok: true }, { status: 201 })
      },
    },
  },
})

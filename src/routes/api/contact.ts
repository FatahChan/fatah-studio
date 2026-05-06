import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { createDb } from '@/db'
import { contactSubmissions } from '@/db/schema'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please tell us your name.').max(100),
  email: z.string().trim().toLowerCase().email('Please enter a valid email.'),
  subject: z.string().trim().min(1, 'Please add a subject.').max(140),
  message: z.string().trim().min(10, 'Tell us a little more.').max(4000),
})

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown
        try {
          payload = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = contactSchema.safeParse(payload)
        if (!parsed.success) {
          const message =
            parsed.error.issues[0]?.message ?? 'Some fields are invalid.'
          return Response.json({ error: message }, { status: 400 })
        }

        let db: ReturnType<typeof createDb>
        try {
          db = createDb()
        } catch (error) {
          console.error('contact: failed to create db', error)
          return Response.json(
            { error: 'Could not send message right now.' },
            { status: 500 },
          )
        }

        try {
          await db.insert(contactSubmissions).values(parsed.data)
        } catch (error) {
          console.error('contact: insert failed', error)
          return Response.json(
            { error: 'Could not send message right now.' },
            { status: 500 },
          )
        }

        return Response.json({ ok: true }, { status: 201 })
      },
    },
  },
})

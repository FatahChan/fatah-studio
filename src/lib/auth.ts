import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { createDb } from '#/db'


const auth = betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    plugins: [tanstackStartCookies()],
    database: drizzleAdapter(createDb(), {
      provider: 'sqlite',
    }),
  })

export default auth
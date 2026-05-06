import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from '@better-auth/drizzle-adapter'
import { createDb } from '#/db'
import { env } from 'cloudflare:workers'
import * as schema from '#/db/schema'

function createAuth() {
  const betterAuthSecret = env.BETTER_AUTH_SECRET ?? process.env.BETTER_AUTH_SECRET
  if (!betterAuthSecret) {
    throw new Error('Missing BETTER_AUTH_SECRET')
  }

  return betterAuth({
    secret: betterAuthSecret,
    baseURL: {
      allowedHosts: ['http://localhost:3000', 'http://localhost:8787', 'https://fatahchan-studio.ahmadfathallah89.workers.dev', 'https://*.fatahchan-studio.ahmadfathallah89.workers.dev', 'studio.fatahchan.dev'],
    },
    trustedOrigins: ['http://localhost:3000', 'http://localhost:8787', 'https://fatahchan-studio.ahmadfathallah89.workers.dev', 'https://*.fatahchan-studio.ahmadfathallah89.workers.dev', 'studio.fatahchan.dev'],
    emailAndPassword: {
      enabled: true,
    },
    plugins: [tanstackStartCookies()],
    database: drizzleAdapter(createDb(), {
      provider: 'sqlite',
      schema: schema,
    }),
  })
}

let authInstance: ReturnType<typeof createAuth> | undefined

export function getAuth() {
  if (!authInstance) {
    authInstance = createAuth()
  }

  return authInstance
}
import type { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';

import { z } from 'zod';

const serverSchema = z.object({
  port: z.number().int().default(3000),
  debug_routes: z.boolean().default(false),
});

const dbSchema = z.object({
  url: z.string(),
});

const appSchema = z.object({
  title: z.string().default('Ashmortar NestJs Core'),
  debugHtmx: z.boolean().default(false),
});

const cookiesSchema = z.object({
  secret: z.string(),
  opts: z.object({
    httpOnly: z.boolean().default(true),
    secure: z.boolean().default(false),
  }),
});

const jwtSchema = z.object({
  secret: z.string(),
});

const oauth2Schema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  callbackURL: z.string(),
});

const authSchema = z.object({
  google: oauth2Schema
    .extend({
      scope: z.array(z.string()).default(['email', 'profile']),
    })
    .optional(),
});

const configSchema = z.object({
  server: serverSchema,
  db: dbSchema,
  jwt: jwtSchema,
  env: z.string(),
  app: appSchema,
  cookies: cookiesSchema,
  auth: authSchema,
});

export type Config = z.infer<typeof configSchema>;

const load = [
  () => {
    const env = {
      server: {
        port: parseInt(process.env.PORT ?? ``),
        debug_routes: process.env.DEBUG_ROUTES === '1',
      },
      db: {
        url: process.env.DB_URL,
      },
      env: process.env.NODE_ENV,
      jwt: {
        secret: process.env.JWT_SECRET,
      },
      app: {
        title: process.env.APP_TITLE,
        debugHtmx: process.env.DEBUG_HTMX === '1',
      },
      cookies: {
        secret: process.env.SESSION_SECRET,
        opts: {},
      },
      auth: {
        google: {
          clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
          scope: process.env.GOOGLE_OAUTH_SCOPE?.split(','),
        },
      },
    };
    return configSchema.parse(env);
  },
] satisfies ConfigFactory<Config>[];

const opts = {
  isGlobal: true,
  load,
} satisfies ConfigModuleOptions;

export default opts;

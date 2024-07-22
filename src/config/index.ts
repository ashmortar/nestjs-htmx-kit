import type { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';
import { SessionOptions } from 'express-session';
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

const sessionSchema = z.object({
  secret: z.string(),
  resave: z.boolean().default(false),
  saveUninitialized: z.boolean().default(false),
}) satisfies z.ZodSchema<SessionOptions, any, any>;

const configSchema = z.object({
  server: serverSchema,
  db: dbSchema,
  env: z.string(),
  app: appSchema,
  session: sessionSchema,
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
      app: {
        title: process.env.APP_TITLE,
        debugHtmx: process.env.DEBUG_HTMX === '1',
      },
      session: {
        secret: process.env.SESSION_SECRET,
        resave: process.env.RESAVE_SESSION === '1',
        saveUninitialized: process.env.SAVE_UNINITIALIZED_SESSION === '1',
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

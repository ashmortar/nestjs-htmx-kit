import { Params } from 'nestjs-pino';
import pino from 'pino';
import { trace, context } from '@opentelemetry/api';
import redact from './redact';

const pinoOpts = {
  pinoHttp: {
    genReqId: (req) => {
      const span = trace.getSpan(context.active());
      if (!span) return req.id;
      const spanContext = trace.getSpan(context.active())?.spanContext();
      if (!spanContext) return req.id;
      return spanContext.traceId;
    },
    stream: pino.destination(1),
    redact,
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
        colorizeObjects: true,
        levelFirst: true,
        translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
        ignore:
          process.env.NODE_ENV === 'production' ? undefined : 'pid,hostname',
      },
    },
    level:
      process.env.NODE_ENV === 'test'
        ? 'silent'
        : process.env.NODE_ENV !== 'production'
          ? 'debug'
          : 'info',
    formatters: {
      level(label, _) {
        return { level: label };
      },
      log(object) {
        const span = trace.getSpan(context.active());
        if (!span) return object;
        const spanContext = trace.getSpan(context.active())?.spanContext();
        if (!spanContext) return object;
        return {
          traceId: spanContext.traceId,
          spanId: spanContext.spanId,
          ...object,
        };
      },
    },
  },
} satisfies Params;

export default pinoOpts;

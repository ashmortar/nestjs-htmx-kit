import type { redactOptions } from 'pino';

const isProd = process.env.NODE_ENV === 'production';

const ignoreDevHeaders = (prefix: 'req' | 'res') =>
  [
    'headers.host',
    'headers.connection',
    'headers["user-agent"]',
    'headers.accept',
    'headers["sec-fetch-site"]',
    'headers["sec-fetch-mode"]',
    'headers["sec-fetch-dest"]',
    'headers["accept-encoding"]',
    'headers["if-none-match"]',
    'headers["content-security-policy"]',
    'headers["cross-origin-opener-policy"]',
    'headers["cross-origin-resource-policy"]',
    'headers["origin-agent-cluster"]',
    'headers["referrer-policy"]',
    'headers["strict-transport-security"]',
    'headers["x-content-type-options"]',
    'headers["x-dns-prefetch-control"]',
    'headers["x-download-options"]',
    'headers["x-frame-options"]',
    'headers["x-permitted-cross-domain-policies"]',
    'headers["x-xss-protection"]',
    'headers.etag',
    'headers.cookie',
  ].map((path) => `${prefix}.${path}`);

const redact: string[] | redactOptions = isProd
  ? ['req.headers.authorization']
  : {
      paths: [
        'req.remoteAddress',
        'req.remotePort',
        ...ignoreDevHeaders('req'),
        ...ignoreDevHeaders('res'),
      ],
      remove: true,
    };

export default redact;

import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { setupApp } from './setup-app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const FULL_DOC_MATCHES = [
    /<!doctype html>/,
    /<html lang="en"/,
    /<head>/,
    /<title>/,
    /<\/title>/,
    /<body/,
    /<header/,
    /<nav/,
    /<\/header>/,
    /<\/nav>/,
    /<\/body>/,
    /<\/html>/,
  ];

  const FRAGMENT_MATCHES = [
    /<main id="main"/,
    /<h1/,
    /<p/,
    /<\/p>/,
    /<\/h1>/,
    /<\/main>/,
  ];

  beforeAll(async () => {
    app = await setupApp();
  });

  afterAll(async () => {
    await app.close();
    return;
  });

  describe('/ (GET) index page', () => {
    const INDEX_MATCHES = [/Welcome to NestJsx/, /is a starter template/];
    it('should return the root html document if no hx-request header', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect(({ text }) => {
          [...FULL_DOC_MATCHES, ...FRAGMENT_MATCHES, ...INDEX_MATCHES].forEach(
            (el) => {
              expect(text).toMatch(el);
            },
          );
        });
    });

    it('should return the root html fragment if hx-request header', () => {
      return request(app.getHttpServer())
        .get('/')
        .set('hx-request', 'true')
        .expect(200)
        .expect(({ text }) => {
          [...FRAGMENT_MATCHES, ...INDEX_MATCHES].forEach((el) => {
            expect(text).toMatch(el);
          });
          FULL_DOC_MATCHES.forEach((el) => {
            expect(text).not.toMatch(el);
          });
        });
    });
  });

  describe('/about (GET) about page', () => {
    const ABOUT_MATCHES = [
      /About/,
      /This is an example of a server rendered page/,
    ];
    it('should return the about html document if no hx-request header', () => {
      return request(app.getHttpServer())
        .get('/about')
        .expect(200)
        .expect(({ text }) => {
          [...FULL_DOC_MATCHES, ...FRAGMENT_MATCHES, ...ABOUT_MATCHES].forEach(
            (el) => {
              expect(text).toMatch(el);
            },
          );
        });
    });

    it('should return the about html fragment if hx-request header', () => {
      return request(app.getHttpServer())
        .get('/about')
        .set('hx-request', 'true')
        .expect(200)
        .expect(({ text }) => {
          [...FRAGMENT_MATCHES, ...ABOUT_MATCHES].forEach((el) => {
            expect(text).toMatch(el);
          });
          FULL_DOC_MATCHES.forEach((el) => {
            expect(text).not.toMatch(el);
          });
        });
    });
  });

  describe('/contact (GET) contact page', () => {
    const CONTACT_MATCHES = [
      /Contact/,
      /This is an example of a server rendered/,
    ];
    it('should return the contact html document if no hx-request header', () => {
      return request(app.getHttpServer())
        .get('/contact')
        .expect(200)
        .expect(({ text }) => {
          [
            ...FULL_DOC_MATCHES,
            ...FRAGMENT_MATCHES,
            ...CONTACT_MATCHES,
          ].forEach((el) => {
            expect(text).toMatch(el);
          });
        });
    });

    it('should return the contact html fragment if hx-request header', () => {
      return request(app.getHttpServer())
        .get('/contact')
        .set('hx-request', 'true')
        .expect(200)
        .expect(({ text }) => {
          [...FRAGMENT_MATCHES, ...CONTACT_MATCHES].forEach((el) => {
            expect(text).toMatch(el);
          });
          FULL_DOC_MATCHES.forEach((el) => {
            expect(text).not.toMatch(el);
          });
        });
    });
  });

  describe('/privacy (GET) privacy page', () => {
    const PRIVACY_MATCHES = [
      /Privacy/,
      /This is an example of a server rendered/,
    ];
    it('should return the privacy html document if no hx-request header', () => {
      return request(app.getHttpServer())
        .get('/privacy')
        .expect(200)
        .expect(({ text }) => {
          [
            ...FULL_DOC_MATCHES,
            ...FRAGMENT_MATCHES,
            ...PRIVACY_MATCHES,
          ].forEach((el) => {
            expect(text).toMatch(el);
          });
        });
    });

    it('should return the privacy html fragment if hx-request header', () => {
      return request(app.getHttpServer())
        .get('/privacy')
        .set('hx-request', 'true')
        .expect(200)
        .expect(({ text }) => {
          [...FRAGMENT_MATCHES, ...PRIVACY_MATCHES].forEach((el) => {
            expect(text).toMatch(el);
          });
          FULL_DOC_MATCHES.forEach((el) => {
            expect(text).not.toMatch(el);
          });
        });
    });
  });

  describe('/terms (GET) terms page', () => {
    const TERMS_MATCHES = [/Terms/, /This is an example of a server rendered/];
    it('should return the terms html document if no hx-request header', () => {
      return request(app.getHttpServer())
        .get('/terms')
        .expect(200)
        .expect(({ text }) => {
          [...FULL_DOC_MATCHES, ...FRAGMENT_MATCHES, ...TERMS_MATCHES].forEach(
            (el) => {
              expect(text).toMatch(el);
            },
          );
        });
    });

    it('should return the terms html fragment if hx-request header', () => {
      return request(app.getHttpServer())
        .get('/terms')
        .set('hx-request', 'true')
        .expect(200)
        .expect(({ text }) => {
          [...FRAGMENT_MATCHES, ...TERMS_MATCHES].forEach((el) => {
            expect(text).toMatch(el);
          });
          FULL_DOC_MATCHES.forEach((el) => {
            expect(text).not.toMatch(el);
          });
        });
    });
  });
});

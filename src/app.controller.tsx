import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HtmlDoc } from './layouts';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import { Header } from './components/header';
import { Footer } from './components/footer';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService<Config>) {}
  @ApiResponse({
    status: 200,
    description: 'Main HTML document landing page',
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: <HtmlDoc>Main Content!</HtmlDoc>,
        },
      },
    },
  })
  @Get()
  get() {
    const { title } = this.configService.getOrThrow('app');
    return (
      <>
        <Header title={title} />
        <main>
          <div class="card">
            <h1 safe>Welcome to {title}</h1>
            <p>
              This is a sample hybrid <strong>htmx</strong> and{' '}
              <strong>jsonapi</strong> application.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

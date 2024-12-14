import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    console.log('middleware: ', req.url, res.statusCode);
    // fs.appendFile(
    //   './logger_requests.txt',
    //   `REQ: ${req.read().raw.toString()}\nRES: ${res.toString()}\n`,
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //       throw err;
    //     }
    //     console.log('Logged!');
    //   },
    // );
    next();
  }
}

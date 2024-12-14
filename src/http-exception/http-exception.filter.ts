import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

// So it catches exactly http exceptions, because it didn't catch my custom one which only inherits it.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    const request = context.getResponse<FastifyRequest>();
    const status = exception.getStatus();
    console.log('filter works');
    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.originalUrl,
      info: 'This is coming from validation filter for HTTP Exceptions',
    });
  }
}

import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class WrapintodataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('intercepted');
    return next.handle().pipe(
      map((data) => ({
        data: data,

        timestamp: Date.now(),
        info: 'Intercepted by the way',
      })),
      catchError((error) => {
        //console.error('Error intercepted:', error);
        return new Observable((observer) => {
          observer.next({
            error: {
              statusCode: error.status || 500,
              message: error.message || 'An error occurred',
              stack: error.stack || null,
            },
            timestamp: Date.now(),
            info: 'Intercepted by the way AND status is 200, this is from interceptor. Could be used for grapqhl 200 always and wrapped error requirements.',
          });
          observer.complete();
        });
      }),
    );
  }
}

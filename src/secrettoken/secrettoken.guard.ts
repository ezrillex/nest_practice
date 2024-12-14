import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SecrettokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (
      context.switchToHttp().getRequest().headers.authorization ===
      'Bearer chocolate'
    ) {
      return true;
    }
    return false;
  }
}

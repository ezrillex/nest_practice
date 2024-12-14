import { HttpException, HttpStatus } from '@nestjs/common';

export class OwnershipException extends HttpException {
  constructor() {
    super(
      'The request involves a resource which does not belong to the user. Or the user lacks the required permissions.',
      HttpStatus.FORBIDDEN,
    );
  }
}

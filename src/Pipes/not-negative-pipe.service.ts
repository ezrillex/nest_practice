import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NotNegativePipe implements PipeTransform {
  transform(value: number) {
    if (value >= 0) {
      return value;
    } else {
      throw new HttpException(
        'The provided value must be a positive integer.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

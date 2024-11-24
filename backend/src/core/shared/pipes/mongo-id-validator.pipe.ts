import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  transform(value: string) {
    if (value && !Types.ObjectId.isValid(value)) {
      throw new HttpException(
        { error_code: 400, error_description: this.message },
        400,
      );
    }
    return value;
  }
}

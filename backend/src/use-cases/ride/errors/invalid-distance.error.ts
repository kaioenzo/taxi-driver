import { HttpException } from '@nestjs/common';

export class InvalidDistanceError extends HttpException {
  constructor() {
    super(
      {
        error_code: 406,
        error_description: 'INVALID_DISTANCE',
      },
      406,
    );
  }
}

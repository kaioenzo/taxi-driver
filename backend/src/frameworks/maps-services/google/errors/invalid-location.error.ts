import { HttpException } from '@nestjs/common';

export class InvalidLocationError extends HttpException {
  constructor() {
    super(
      {
        error_code: 400,
        error_description: 'Invalid location',
      },
      400,
    );
  }
}

import { HttpException } from '@nestjs/common';

export class RidesNotFoundError extends HttpException {
  constructor() {
    super(
      {
        error_code: 404,
        error_description: 'NO_RIDES_FOUND',
      },
      404,
    );
  }
}

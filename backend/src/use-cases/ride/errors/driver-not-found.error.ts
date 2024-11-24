import { HttpException } from '@nestjs/common';

export class DriverNotFoundError extends HttpException {
  constructor() {
    super(
      {
        error_code: 404,
        error_description: 'DRIVER_NOT_FOUND',
      },
      404,
    );
  }
}

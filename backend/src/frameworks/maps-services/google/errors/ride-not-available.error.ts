import { HttpException } from '@nestjs/common';

export class RideNotAvailableError extends HttpException {
  constructor() {
    super(
      {
        error_code: 400,
        error_description: 'Ride not available',
      },
      400,
    );
  }
}

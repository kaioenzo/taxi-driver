import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ConfirmRideDto } from 'src/core/dtos/confirm-ride.dto';
import { RideEstimateResponse } from 'src/core/dtos/estimate-ride-response.dto';
import { EstimateRideDto } from 'src/core/dtos/estimate-ride.dto';
import { RideUseCases } from 'src/use-cases/ride/ride.use-case';

@Controller('ride')
export class RideController {
  constructor(private readonly rideUseCases: RideUseCases) {}

  @Post('estimate')
  estimateRide(
    @Body() estimateRideDto: EstimateRideDto,
  ): Promise<RideEstimateResponse> {
    return this.rideUseCases.estimateRide(estimateRideDto);
  }

  @Patch('confirm')
  confirmRide(@Body() confirmRideDto: ConfirmRideDto) {
    return confirmRideDto;
  }
}

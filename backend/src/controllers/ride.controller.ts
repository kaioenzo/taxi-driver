import { Body, Controller, Post } from '@nestjs/common';
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
}

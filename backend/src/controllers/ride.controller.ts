import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ConfirmRideDto } from 'src/core/dtos/confirm-ride.dto';
import { RideEstimateResponse } from 'src/core/dtos/estimate-ride-response.dto';
import { EstimateRideDto } from 'src/core/dtos/estimate-ride.dto';
import { ValidateMongoIdPipe } from 'src/core/shared/pipes/mongo-id-validator.pipe';
import { RideUseCases } from 'src/use-cases/ride/ride.use-case';

@Controller('ride')
export class RideController {
  constructor(private readonly rideUseCases: RideUseCases) {}

  @Get(':customer_id')
  getRideInfo(
    @Param('customer_id') customerId: string,
    @Query('driver_id', new ValidateMongoIdPipe('INVALID_DRIVER'))
    driverId?: string,
  ) {
    return this.rideUseCases.getRideInfo(customerId, driverId);
  }

  @Post('estimate')
  estimateRide(
    @Body() estimateRideDto: EstimateRideDto,
  ): Promise<RideEstimateResponse> {
    return this.rideUseCases.estimateRide(estimateRideDto);
  }

  @Patch('confirm')
  async confirmRide(@Body() confirmRideDto: ConfirmRideDto) {
    await this.rideUseCases.confirmRide(confirmRideDto);
    return { sucess: true };
  }
}

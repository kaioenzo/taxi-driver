import { Injectable } from '@nestjs/common';
import { MapsService } from 'src/core/abstracts/maps.service';
import { RideEstimateResponse } from 'src/core/dtos/estimate-ride-response.dto';
import { EstimateRideDto } from 'src/core/dtos/estimate-ride.dto';
import { DriverRepository } from 'src/frameworks/data-services/driver.repository';

@Injectable()
export class RideUseCases {
  constructor(
    private routeService: MapsService, // Injeta a interface
    private driverDataService: DriverRepository,
  ) {}

  async estimateRide(
    estimateRideDto: EstimateRideDto,
  ): Promise<RideEstimateResponse> {
    const { rows, ...routeResponse } = await this.routeService.getRideInfo(
      estimateRideDto.origin,
      estimateRideDto.destination,
    );
    const { distance, duration } = rows[0].elements[0];

    const options = await this.getDriversAvailable(distance.value);

    return {
      distance: distance.value / 1000,
      duration: duration.text,
      routeResponse,
      options,
    };
  }

  private async getDriversAvailable(distance: number) {
    const options = await this.driverDataService.getDriversAvailable(distance);

    options.map((option) => {
      option.value = option.value * (distance / 1000);
    });
    options.sort((a, b) => a.value - b.value);
    return options;
  }
}

import { Injectable } from '@nestjs/common';
import { MapsService } from 'src/core/abstracts/maps.service';
import { RideEstimateResponse } from 'src/core/dtos/estimate-ride-response.dto';
import { EstimateRideDto } from 'src/core/dtos/estimate-ride.dto';
import { DriverRepository } from 'src/frameworks/data-services/driver.repository';

@Injectable()
export class RideUseCases {
  constructor(
    private routeService: MapsService,
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
    const { origin, destination } = await this.getRideCoordinates(
      routeResponse.origin_addresses[0],
      routeResponse.destination_addresses[0],
    );
    return {
      origin,
      destination,
      distance: distance.value / 1000,
      duration: duration.text,
      routeResponse,
      options,
    };
  }

  private async getRideCoordinates(
    originAdress: string,
    destinationAdress: string,
  ) {
    const origin = await this.routeService.getRideCoordinates(originAdress);
    const destination =
      await this.routeService.getRideCoordinates(destinationAdress);
    return { origin, destination };
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

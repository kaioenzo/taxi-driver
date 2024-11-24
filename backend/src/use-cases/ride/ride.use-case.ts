import { Injectable } from '@nestjs/common';
import { MapsService } from 'src/core/abstracts/maps.service';
import { ConfirmRideDto } from 'src/core/dtos/confirm-ride.dto';
import { RideEstimateResponse } from 'src/core/dtos/estimate-ride-response.dto';
import { EstimateRideDto } from 'src/core/dtos/estimate-ride.dto';
import { DriverRepository } from 'src/frameworks/data-services/driver.repository';
import { RideRepository } from 'src/frameworks/data-services/ride.repository';
import { DriverNotFoundError } from 'src/frameworks/maps-services/google/errors/driver-not-found.error';
import { InvalidDistanceError } from 'src/frameworks/maps-services/google/errors/invalida-distance.error';
import { RideFactoryService } from './ride-factory.service';

@Injectable()
export class RideUseCases {
  constructor(
    private routeService: MapsService,
    private driverDataService: DriverRepository,
    private rideDataService: RideRepository,
    private rideFactoryService: RideFactoryService,
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
    const { origin, destination } = await this.routeService.getRideCoordinates(
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

  async confirmRide(confirmRideDto: ConfirmRideDto) {
    await this.validateDriverAndDistance(confirmRideDto);
    const ride = this.rideFactoryService.createNewRide(confirmRideDto);
    await this.rideDataService.createRide(ride);
    return;
  }

  private async validateDriverAndDistance({
    driver,
    distance,
  }: ConfirmRideDto) {
    const driverEntity = await this.driverDataService.getDriverById(driver.id);
    if (!driverEntity) {
      throw new DriverNotFoundError();
    }
    if (distance < driverEntity.minimumDistance) {
      throw new InvalidDistanceError();
    }
  }

  private async getDriversAvailable(distance: number) {
    const options = await this.driverDataService.getDriversAvailable(distance);

    options.forEach((option) => {
      option.value = option.value * (distance / 1000);
    });
    options.sort((a, b) => a.value - b.value);
    return options;
  }
}

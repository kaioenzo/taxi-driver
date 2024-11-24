import { Injectable } from '@nestjs/common';
import { ConfirmRideDto } from 'src/core/dtos/confirm-ride.dto';
import { Ride } from 'src/core/entities/ride.entity';

@Injectable()
export class RideFactoryService {
  createNewRide(confirmRideDto: ConfirmRideDto) {
    const newRide = new Ride();
    newRide.customerId = confirmRideDto.customer_id;
    newRide.origin = confirmRideDto.origin;
    newRide.destination = confirmRideDto.destination;
    newRide.distance = confirmRideDto.distance;
    newRide.duration = confirmRideDto.duration;
    newRide.driver = confirmRideDto.driver.id;
    newRide.value = confirmRideDto.value;
    return newRide;
  }
}

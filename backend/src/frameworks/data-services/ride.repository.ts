import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ride, RideDocument } from './model/ride.model';

@Injectable()
export class RideRepository {
  constructor(@InjectModel(Ride.name) private rideModel: Model<RideDocument>) {}

  createRide(ride: Ride) {
    return this.rideModel.create(ride);
  }
}

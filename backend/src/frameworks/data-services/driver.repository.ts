import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from './model/driver.model';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectModel(Driver.name) private driverRepository: Model<DriverDocument>,
  ) {}

  getDriversAvailable(distance: number) {
    return this.driverRepository
      .find({ minimumDistance: { $lte: distance / 1000 } })
      .exec();
  }

  getDriverById(driverId: string): Promise<Driver | null> {
    return this.driverRepository.findById(driverId).exec();
  }

  getAll() {
    return this.driverRepository.find().exec();
  }
}

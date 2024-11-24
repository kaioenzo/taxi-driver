import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATA_BASE_CONFIGURATION } from 'src/configuration';
import { DriverRepository } from './driver.repository';
import { Driver, DriverSchema } from './model/driver.model';
import { Ride, RideSchema } from './model/ride.model';
import { RideRepository } from './ride.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
      {
        name: Ride.name,
        schema: RideSchema,
      },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
  ],
  providers: [DriverRepository, RideRepository],
  exports: [DriverRepository, RideRepository],
})
export class MongoDataServicesModule {}

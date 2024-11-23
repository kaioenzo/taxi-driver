import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATA_BASE_CONFIGURATION } from 'src/configuration';
import { DriverRepository } from './driver.repository';
import { Driver, DriverSchema } from './model/driver.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Driver.name,
        schema: DriverSchema,
      },
    ]),
    MongooseModule.forRoot(DATA_BASE_CONFIGURATION.mongoConnectionString),
  ],
  providers: [DriverRepository],
  exports: [DriverRepository],
})
export class MongoDataServicesModule {}

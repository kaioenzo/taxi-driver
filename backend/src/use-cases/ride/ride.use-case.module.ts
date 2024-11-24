import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/data-services/mongo-data-services.module';
import { MapsModule } from 'src/frameworks/maps-services/google-maps.module';
import { RideUseCases } from 'src/use-cases/ride/ride.use-case';
import { RideFactoryService } from './ride-factory.service';

@Module({
  imports: [MapsModule, MongoDataServicesModule],
  providers: [RideUseCases, RideFactoryService],
  exports: [RideUseCases],
})
export class RideUseCasesModule {}

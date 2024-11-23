import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/data-services/mongo-data-services.module';
import { MapsModule } from 'src/frameworks/maps-services/google-maps.module';
import { RideUseCases } from 'src/use-cases/ride/ride.use-case';

@Module({
  imports: [MapsModule, MongoDataServicesModule],
  providers: [RideUseCases],
  exports: [RideUseCases],
})
export class RideUseCasesModule {}

import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from 'src/frameworks/data-services/mongo-data-services.module';
import { DriverUseCase } from './driver.use-case';

@Module({
  providers: [DriverUseCase],
  exports: [DriverUseCase],
  imports: [MongoDataServicesModule],
})
export class DriverUseCasesModule {}

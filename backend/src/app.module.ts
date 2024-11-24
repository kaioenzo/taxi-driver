import { Module } from '@nestjs/common';
import { DriverController } from './controllers/driver.controller';
import { RideController } from './controllers/ride.controller';
import { DriverUseCasesModule } from './use-cases/driver/driver.use-case.module';
import { RideUseCasesModule } from './use-cases/ride/ride.use-case.module';

@Module({
  imports: [RideUseCasesModule, DriverUseCasesModule],
  controllers: [RideController, DriverController],
  providers: [],
})
export class AppModule {}

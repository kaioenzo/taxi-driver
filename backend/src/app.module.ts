import { Module } from '@nestjs/common';
import { RideController } from './controllers/ride.controller';
import { RideUseCasesModule } from './use-cases/ride/ride.use-case.module';

@Module({
  imports: [RideUseCasesModule],
  controllers: [RideController],
  providers: [],
})
export class AppModule {}

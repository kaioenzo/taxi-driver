import { Controller, Get } from '@nestjs/common';
import { DriverUseCase } from 'src/use-cases/driver/driver.use-case';

@Controller('driver')
export class DriverController {
  constructor(private driverUseCase: DriverUseCase) {}
  @Get()
  getDrivers() {
    return this.driverUseCase.getDrivers();
  }
}

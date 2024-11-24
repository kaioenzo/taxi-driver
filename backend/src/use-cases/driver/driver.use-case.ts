import { Injectable } from '@nestjs/common';
import { DriverRepository } from 'src/frameworks/data-services/driver.repository';

@Injectable()
export class DriverUseCase {
  constructor(private driverRepository: DriverRepository) {}
  async getDrivers() {
    return this.driverRepository.getAll();
  }
}

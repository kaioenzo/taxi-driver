import { Driver } from './driver.entity';

export class Ride {
  customerId: string;

  origin: string;

  destination: string;

  distance: number;

  duration: string;

  driver: Driver;

  value: number;
}

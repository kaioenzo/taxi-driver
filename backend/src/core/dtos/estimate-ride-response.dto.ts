import { Driver } from '../entities/driver.entity';

export interface RideEstimateResponse {
  distance: number;
  duration: string;
  routeResponse: any;
  options: Driver[];
}

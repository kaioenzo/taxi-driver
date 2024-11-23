import { Driver } from '../entities/driver.entity';

export interface RideEstimateResponse {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
  distance: number;
  duration: string;
  routeResponse: any;
  options: Driver[];
}

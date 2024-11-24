import { Driver } from "./RideEstimateDto";

export class RideHistory {
  customer_id: string;
  rides: Ride[];
}

export class Ride {
  _id: string;
  customerId: string;
  driver_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
  options: Driver[];
}

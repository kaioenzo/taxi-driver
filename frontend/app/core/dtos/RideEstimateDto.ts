export class RideEstimate {
  origin!: {
    lat: number;
    lng: number;
  };
  destination!: {
    lat: number;
    lng: number;
  };
  distance!: number;
  duration!: string;
  routeResponse!: {
    destination_addresses: string[];
    origin_addresses: string[];
    status: string;
  };
  options!: Driver[];
}

export class Driver {
  _id!: string;
  name!: string;
  description!: string;
  vehicle!: string;
  value!: number;
  minimumDistance!: number;
  review!: {
    rating: number;
    comment: string;
  };
}

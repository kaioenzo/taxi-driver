import { LatLngLiteral } from '@googlemaps/google-maps-services-js';

export abstract class MapsService {
  abstract getRideInfo(origin: string, destination: string): Promise<any>;
  abstract getRideCoordinates(address: string): Promise<LatLngLiteral>;
}

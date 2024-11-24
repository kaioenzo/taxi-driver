import { LatLngLiteral } from '@googlemaps/google-maps-services-js';

export abstract class MapsService {
  abstract getRideInfo(origin: string, destination: string): Promise<any>;
  abstract getRideCoordinates(
    originAdress: string,
    destinationAdress: string,
  ): Promise<{ origin: LatLngLiteral; destination: LatLngLiteral }>;
}

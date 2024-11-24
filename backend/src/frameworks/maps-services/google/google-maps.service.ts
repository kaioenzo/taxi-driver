import { Client, UnitSystem } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';
import { MapsService } from '../../../core/abstracts/maps.service';
import { InvalidLocationError } from './errors/invalid-location.error';
import { RideNotAvailableError } from './errors/ride-not-available.error';

@Injectable()
export class GoogleMapsService extends MapsService {
  private readonly client: Client = new Client();

  async getRideInfo(origin: string, destination: string) {
    const response = await this.client.distancematrix({
      params: {
        origins: [origin],
        destinations: [destination],
        key: process.env.GOOGLE_API_KEY,
        region: 'br',
        units: UnitSystem.metric,
      },
    });

    const { status } = response.data.rows[0].elements[0];
    if (status === 'ZERO_RESULTS') {
      throw new RideNotAvailableError();
    }

    if (status === 'NOT_FOUND') {
      throw new InvalidLocationError();
    }

    return response.data;
  }

  async getRideCoordinates(originAdress: string, destinationAdress: string) {
    const originResponse = await this.client.geocode({
      params: {
        address: originAdress,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    const destinationResponse = await this.client.geocode({
      params: {
        address: destinationAdress,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    return {
      origin: originResponse.data.results[0].geometry.location,
      destination: destinationResponse.data.results[0].geometry.location,
    };
  }
}

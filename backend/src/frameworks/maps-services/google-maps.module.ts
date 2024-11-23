import { Module } from '@nestjs/common';
import { MapsService } from '../../core/abstracts/maps.service';
import { GoogleMapsService } from './google/google-maps.service';

@Module({
  providers: [
    {
      provide: MapsService,
      useClass: GoogleMapsService,
    },
  ],
  exports: [MapsService],
})
export class MapsModule {}

import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsNotEqual } from '../shared/pipes/is-not-equal.pipe';

export class EstimateRideDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  @Validate(IsNotEqual, ['origin'], {
    message: 'Destination and origin cannot be the same',
  })
  destination: string;
}

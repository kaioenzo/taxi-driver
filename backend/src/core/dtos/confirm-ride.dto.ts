import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { IsNotEqual } from '../shared/pipes/is-not-equal.pipe';
class DriverConfirmRideDto {
  @IsNotEmpty()
  @IsMongoId()
  id: any;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class ConfirmRideDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsNotEqual, ['origin'], {
    message: 'Destination and origin cannot be the same',
  })
  destination: string;

  @IsNumber()
  @IsNotEmpty()
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverConfirmRideDto)
  driver: DriverConfirmRideDto;

  @IsNumber()
  @IsNotEmpty()
  value: number;
}

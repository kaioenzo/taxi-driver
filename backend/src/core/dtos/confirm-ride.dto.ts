import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
class DriverConfirmRideDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ConfirmRideDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;
  distance: number;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DriverConfirmRideDto)
  driver: DriverConfirmRideDto;

  @IsString()
  @IsNumber()
  value: number;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Driver } from './driver.model';

export type RideDocument = Ride & Document;

@Schema({ timestamps: true })
export class Ride {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  destination: string;

  @Prop({ required: true })
  distance: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Driver.name })
  driver: Driver;

  @Prop({ required: true })
  value: number;
}

export const RideSchema = SchemaFactory.createForClass(Ride);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from './review.model';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  vehicle: string;

  @Prop({ type: Review, required: true }) // Review como subdocumento
  review: Review;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  minimumDistance: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

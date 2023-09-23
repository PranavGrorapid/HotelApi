import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Location {
  @Prop({ type: String, enum: ['Point'] })
  type: string;

  @Prop({ index: '2dsphere' })
  coordinates: Number[];

  formattedAddress: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
}


export enum Category{

    "CHINESE" = "Chinese",
    "INDIAN" = "Indian",
    "ARABIAN" = "Arabian",
     
}

@Schema()
export class Hotel {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: object[];

  @Prop({ type: Object, ref: 'Location' })
  location?: Location;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

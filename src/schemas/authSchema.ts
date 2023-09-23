import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export enum UserRoles{

    ADMIN = 'Admin',
    USER='User'
}


@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({unique:[true,"Duplicate Email entered"]})
  email: string;

  @Prop({select:false})
  password: string;

    @Prop({
        enum: UserRoles,
        default:UserRoles.USER
  })
   role:UserRoles
}

export const usersSchema = SchemaFactory.createForClass(User);

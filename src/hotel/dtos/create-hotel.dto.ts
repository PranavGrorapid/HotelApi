import { Category } from "src/schemas/hotelSchema";
import { IsString, IsInt,IsNotEmpty,IsEmail,IsPhoneNumber,IsEnum } from 'class-validator';


export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter a valid Email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN', { message: 'please enter a valid phone number' })
  readonly phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;
  
  
  images?: object[];
}
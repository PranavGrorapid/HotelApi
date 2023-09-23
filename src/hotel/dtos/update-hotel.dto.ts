import { Category } from 'src/schemas/hotelSchema';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional
} from 'class-validator';



export class UpdateHotelDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsPhoneNumber('IN', { message: 'please enter a valid phone number' })
  readonly phoneNumber: number;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsEnum(Category)
  readonly category: Category;

  @IsOptional()
  readonly images?: object[];
}

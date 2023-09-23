
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsEmail,
  
 
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter a valid Email address' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password:string
}

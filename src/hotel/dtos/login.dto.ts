import {  IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  
  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter a valid Email address' })
  readonly email: string;

  @IsNotEmpty()
  
  readonly password: string;
}

import { Controller,Post,Body,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/authSchema';
import { SignupDto } from 'src/hotel/dtos/signup-user.dto';
import { LoginDto } from 'src/hotel/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUpUser(@Body() userInfo: SignupDto): Promise<User> {
    return this.authService.signupUser(userInfo);
  }

  @Post('/login')
  async loginUser(@Body() loginDetails: LoginDto , @Req() req): Promise<{ token: string }> {
    console.log('req',req)
    return this.authService.loginUser(loginDetails);
  }
}

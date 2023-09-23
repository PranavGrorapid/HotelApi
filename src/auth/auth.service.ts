import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/hotel/dtos/login.dto';
import { SignupDto } from 'src/hotel/dtos/signup-user.dto';
import { User } from 'src/schemas/authSchema';
import { JwtService } from '@nestjs/jwt';
import ApiFeature from 'src/hotel/utils/apiFeature.utils';

var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signupUser(userInfo: SignupDto):Promise<User> {
    try {
      const { userName, email, password } = userInfo;

      const emailExist = await this.userModel.findOne({ email });

      if (emailExist) {
        throw new NotFoundException('email already exists');
      }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        

      const user = this.userModel.create({
        userName,
        email,
        password: hashedPassword,
      });


      return user
     

      
    } catch (err) {
      console.log('err', err);

      
    }
  }

  async loginUser(loginDetails: LoginDto): Promise<{token:string}> {
    try {
      const { email, password } = loginDetails;

      const userExists = await this.userModel
        .findOne({ email })
        .select('+password');

      if (!userExists) {
        throw new UnauthorizedException('user not found...');
      }

      const matchPassword = await bcrypt.compare(password, userExists.password);

      if (!matchPassword) {
        throw new UnauthorizedException('password mismatch...');
      }

      if (matchPassword && userExists) {
        console.log('user login successfull');

        const token = await ApiFeature.assignJwtToken(
          userExists._id,
          this.jwtService,
        );

        return { token }
      }
    } catch (err) {
      console.log(err);

  
    }
  }
}

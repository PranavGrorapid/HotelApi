import { Controller,Get,Post,Body,Param,Put,Delete,Query,UseGuards,Req } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { Hotel } from 'src/schemas/hotelSchema';
import { UpdateHotelDto } from './dtos/update-hotel.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import {AuthGuard } from '@nestjs/passport'
import { CurrentUser} from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/schemas/authSchema';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get()
  async findAllHotels(
    @Query() query: ExpressQuery,
    @Req() req: any,
  ): Promise<Hotel[]> {
    console.log('user', req.user);
    return await this.hotelService.getAllHotels(query);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async createHotel(@Body() hotel: CreateHotelDto): Promise<Hotel> {
    return await this.hotelService.createHotels(hotel);
  }

  @Get(':id')
  async getHotelDetails(@Param('id') id: string): Promise<Hotel> {
    return await this.hotelService.findHotelById(id);
  }

  @Put(':id')
  async updateHotel(
    @Param('id') id: string,
    @Body() hotel: UpdateHotelDto,
  ): Promise<Hotel> {
    return this.hotelService.updateHotel(id, hotel);
  }

  @Delete(':id')
  async deleteHotelById(@Param('id') id: string): Promise<string> {
    return this.hotelService.DeleteHotel(id);
  }
}

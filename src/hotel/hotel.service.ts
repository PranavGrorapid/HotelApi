import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Hotel } from 'src/schemas/hotelSchema';
import { CreateHotelDto } from './dtos/create-hotel.dto';
import { UpdateHotelDto } from './dtos/update-hotel.dto';
import { Query } from 'express-serve-static-core';
import ApiFeature from './utils/apiFeature.utils';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: mongoose.Model<Hotel>,
  ) {}

  // get all hotels

  async getAllHotels(query: Query): Promise<Hotel[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const allHotels = await this.hotelModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    console.log('allHotels', allHotels);

    return allHotels;
  }

  // create a new hotel

  async createHotels(hotel: CreateHotelDto): Promise<Hotel> {
    const location = await ApiFeature.getHotelLocation(hotel.address);

    const data = Object.assign(hotel, { location });

    const newHotel = await this.hotelModel.create(data);
    return newHotel;
  }

  // find hotel by id

  async findHotelById(id: string): Promise<Hotel> {
    console.log('id', id);

    const isInValid = mongoose.isValidObjectId(id);

    if (!isInValid) {
      throw new BadRequestException(
        'wrong mongoose ID error .please enter Correct ID',
      );
    }

    const hotelDetails = await this.hotelModel.findById(id);

    console.log('hotelDetails', hotelDetails);

    if (!hotelDetails) {
      throw new NotFoundException('hotel not found');
    }

    return hotelDetails;
  }

  //update hotel by id

  async updateHotel(id: string, hotel: UpdateHotelDto): Promise<Hotel> {
    await this.findHotelById(id);
    return this.hotelModel.findByIdAndUpdate(id, hotel, {
      new: true,
      runValidators: true,
    });
  }

  // delete hotel by id

  async DeleteHotel(id: string): Promise<string> {
    await this.findHotelById(id);

    const deleted = await this.hotelModel.findByIdAndRemove(id);

    console.log('deleted', deleted);

    if (deleted) {
      return 'hotel Deleted successfully';
    }
  }

 
}

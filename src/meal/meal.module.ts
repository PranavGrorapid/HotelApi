import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './schema/meal.schema';
import { HotelModule } from 'src/hotel/hotel.module';

@Module({

  imports: [
    
    AuthModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    HotelModule
  ],

  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}

import { Location } from "src/schemas/hotelSchema";
import { JwtService } from '@nestjs/jwt';

const NodeGeocoder = require('node-geocoder');


export default class ApiFeature {
  
  
    static async getHotelLocation(address) {
    try {
      const options = {
        provider: process.env.GEOCODER_PROVIDER,
        apiKey: process.env.GEOCODER_API_KEY,
        formatter: null, // 'gpx', 'string', ...
      };

      const geoCoder = NodeGeocoder(options);

      const loc = await geoCoder.geocode(address);

      console.log('location5555555555555555', loc[0]);

      const location: Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
      };

      return location;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async assignJwtToken(
    userId: string,
    jwtService: JwtService,
  ): Promise<string> {
    const payload = { id: userId };

    const token = await jwtService.sign(payload);

    console.log('tokrn',token);
    

    return token;
  }
}

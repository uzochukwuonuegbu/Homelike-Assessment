import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import ApartmentController from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { ApartmentDataService } from './apartmentData.service';
import { FavouriteService } from '../favourite/favourite.service';
import { FavouriteDataService } from '../favourite/favouriteData.service';
import { generalConfig } from '../config';
import { MongoDbClient } from '../database/mongoDbClient';
import JWTService from '../JWTService';

@Module({
	imports: [
		JwtModule.register({
			secret: generalConfig.jwtSecret,
		}),
	],
	controllers: [ApartmentController],
	providers: [
		JWTService,
		ApartmentService,
		ApartmentDataService,
		MongoDbClient,
		FavouriteDataService,
		FavouriteService,
	],
})
export class ApartmentModule {}

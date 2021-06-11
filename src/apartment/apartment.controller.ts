import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApartmentService } from './apartment.service';
import ApartmentDto from './dto/Apartment.dto';
import JWTService from '../JWTService';

@Controller('apartments')
export default class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService, private readonly jwtService: JWTService) {}

	@Post('/add')
	@UseGuards(AuthGuard('jwt'))
	async create(@Body() payload: ApartmentDto) {
    console.log('RUNNING THIS!')
		return this.apartmentService.processCreateApartment(payload);
	}

	@Get('/search')
	async search(@Query() query: any) {
		return this.apartmentService.processApartmentSearch(query);
	}

	@Get('/favourites')
	@UseGuards(AuthGuard('jwt'))
	async favourites(@Headers() headers: any) {
		const { authorization } = headers;
		const payload = this.jwtService.verifyToken(authorization.replace('Bearer ', ''));
		if (!payload) {
			return [];
		}
		const { id: userId } = payload;
		try {
			return this.apartmentService.processFavouriteApartments(userId);
		} catch (error) {}
	}

	@Post('/:id/favourites')
	@UseGuards(AuthGuard('jwt'))
	async addFavourites(@Headers() headers: any, @Param() param: any) {
    console.log('HERE!!')
		const { id } = param;
		const { authorization } = headers;
		console.log({ id, authorization });
		const payload = this.jwtService.verifyToken(authorization.replace('Bearer ', ''));
		console.log({ payload });
		if (!payload && !payload.id) {
			return [];
		}
		const { id: userId } = payload;
		return this.apartmentService.addFavouriteApartments(userId, id);
	}
}

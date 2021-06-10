import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApartmentService } from './apartment.service';
import ApartmentDto from './dto/Apartment.dto';

@Controller('apartments')
export default class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService) {}

	@Post('/add')
	@UseGuards(AuthGuard('jwt'))
	async create(@Body() payload: ApartmentDto) {
		return this.apartmentService.processCreateApartment(payload);
	}

	@Get('/search')
	async search(@Query() query: any) {
		return this.apartmentService.processApartmentSearch(query);
	}
}

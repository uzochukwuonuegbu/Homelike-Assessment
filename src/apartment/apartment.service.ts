import { Injectable } from '@nestjs/common';
import { ApartmentDataService } from './apartmentData.service';
import { ApartmentConfig } from './types';
import { FavouriteService } from '../favourite/favourite.service';
import logger from '../log.service';

@Injectable()
export class ApartmentService {
	constructor(
		private readonly apartmentDataService: ApartmentDataService,
		private readonly favouriteService: FavouriteService
	) {}

	public async processCreateApartment(data: ApartmentConfig): Promise<ApartmentConfig> {
		logger.infoLog('Started processing apartment creation', { data });
		const apartments = await this.apartmentDataService.createApartment(data);
		return apartments;
	}

	public async processApartmentSearch(filter: any): Promise<ApartmentConfig[]> {
		const apartments = await this.apartmentDataService.getApartments(filter);
		return apartments;
	}

	public async processFavouriteApartments(userId: string): Promise<ApartmentConfig[]> {
		const userFavApartmentIds = await this.favouriteService.processFavouriteList({ userId });
		const apartments = await this.apartmentDataService.getFavouriteApartments(userFavApartmentIds);
		return apartments;
	}

	public async addFavouriteApartments(userId: string, apartmentId: string): Promise<string | void> {
		const alreadyMarkedFav = await this.favouriteService.processFavouriteList({ userId, apartmentId });
		if (alreadyMarkedFav.length) return 'Already marked as favourite';
		await this.favouriteService.processCreateFavourite({ userId, apartmentId });
	}
}

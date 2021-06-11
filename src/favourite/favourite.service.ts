import { Injectable } from '@nestjs/common';
import { FavouriteDataService } from './favouriteData.service';
import { FavouritesConfig } from './types';

@Injectable()
export class FavouriteService {
	constructor(private readonly favouriteDataService: FavouriteDataService) {}

	public async processCreateFavourite(data: FavouritesConfig): Promise<void> {
		return await this.favouriteDataService.addFavourite(data);
	}

	public async processFavouriteList(filter: any): Promise<string[]> {
		const favList = await this.favouriteDataService.getFavouritesByUserId(filter);
		return favList.map((fav) => fav.apartmentId);
	}
}

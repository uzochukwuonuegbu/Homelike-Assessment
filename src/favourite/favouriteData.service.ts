import { Injectable } from '@nestjs/common';
import { MongoDbClient } from '../database';
import { generalConfig } from '../config';
import { FavouritesConfig } from './types';
const { favouriteTableName } = generalConfig;

@Injectable()
export class FavouriteDataService {
	constructor(private readonly mongoDbClient: MongoDbClient) {}

	async addFavourite(data: any): Promise<any> {
		return await this.mongoDbClient.addItem(favouriteTableName, data);
	}

	async getFavouritesByUserId(filter:any): Promise<FavouritesConfig[]> {
    return await this.mongoDbClient.queryItems(favouriteTableName, filter);
  }
}

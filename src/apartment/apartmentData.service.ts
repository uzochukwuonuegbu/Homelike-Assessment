import { Injectable } from '@nestjs/common';
import { MongoDbClient } from '../database';
import { generalConfig } from '../config';
import { ApartmentSearchConfig, ApartmentConfig, GEOJsonType, StoredApartmentConfig } from './types';
import logger from '../log.service';
const apartmentTableName = generalConfig.apartmentTableName;

@Injectable()
export class ApartmentDataService {
	constructor(private readonly mongoDbClient: MongoDbClient) {}

	async createApartment(data: ApartmentConfig): Promise<void> {
		await this.mongoDbClient.addItem(apartmentTableName, data);
		logger.infoLog('Created apartment with following data: ', { data });
	}

	async getApartment(id: string): Promise<StoredApartmentConfig> {
    const Items = await this.mongoDbClient.getItem(apartmentTableName, { id });
		return Items as StoredApartmentConfig;
	}

	async getApartments(filter: ApartmentSearchConfig): Promise<StoredApartmentConfig[]> {
		const query = this.buildSearchQuery(filter);
		const Items = await this.mongoDbClient.queryItems(apartmentTableName, query);
		return Items as StoredApartmentConfig[];
	}

	async getFavouriteApartments(ids: string[]): Promise<StoredApartmentConfig[]> {
		const uniqueIds = ids.filter((v, i, a) => a.indexOf(v) === i);
		const Items = await this.mongoDbClient.batchGetItems(apartmentTableName, uniqueIds);
		return Items as StoredApartmentConfig[];
	}

	private buildSearchQuery(filter: ApartmentSearchConfig): ApartmentSearchConfig {
		const query = filter || {};
		if (query && query.rooms) {
			query.rooms = Number(query.rooms);
		}
		if (query && query.long && query.lat && query.nearestTo) {
			const coordinates = [Number(query.long), Number(query.lat)];
			query.location = {
				$near: {
					$maxDistance: Number(query.nearestTo) * 1000,
					$geometry: {
						type: GEOJsonType.Point,
						coordinates,
					},
				},
			};
			delete query.long;
			delete query.lat;
			delete query.nearestTo;
		}
		return query;
	}
}

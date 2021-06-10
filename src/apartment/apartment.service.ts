import { Injectable } from '@nestjs/common';
import { ApartmentDataService } from './apartmentData.service';
import { ApartmentConfig, ApartmentSearchConfig } from './types';

@Injectable()
export class ApartmentService {
	constructor(private readonly apartmentDataService: ApartmentDataService) {}

	public async processCreateApartment(data: ApartmentConfig): Promise<ApartmentConfig> {
		const apartments = await this.apartmentDataService.createApartment(data);
		return apartments;
	}

	public async processApartmentSearch(filter: any): Promise<ApartmentConfig[]> {
		const apartments = await this.apartmentDataService.getApartments(filter);
		return apartments;
	}
}

import { Test, TestingModule } from '@nestjs/testing';
import { ApartmentModule } from '../apartment.module';
import { ApartmentService } from '../apartment.service';
import { ApartmentDataService } from '../apartmentData.service';

jest.mock('../../log.service.ts');


// Proof of Concept!!


describe('ApartmentService', () => {
	let apartmentService: ApartmentService;
	let apartmentDataService: ApartmentDataService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ApartmentModule],
		}).compile();

		apartmentService = module.get<ApartmentService>(ApartmentService);
		apartmentDataService = module.get<ApartmentDataService>(ApartmentDataService);
	});

	describe('processCreateApartment', () => {
		it('should store apartment info', async () => {
			const data = {
				name: 'Fourth Apartment',
				city: 'Lagos',
				country: 'Nigeria',
				rooms: 5,
				location: {
					type: 'Point',
					coordinates: [-73.856077, 68.848447],
				},
			};
			jest.spyOn(apartmentDataService, 'createApartment').mockImplementation(() => new Promise((resolve) => resolve()));

			await apartmentService.processCreateApartment(data);

			expect(apartmentDataService.createApartment).toHaveBeenCalledWith(data);
		});
	});
});

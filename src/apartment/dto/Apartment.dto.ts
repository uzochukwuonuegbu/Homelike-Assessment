import { IsEmail, IsString, MinLength, IsNotEmpty, IsNumber } from 'class-validator';

export default class ApartmentDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	country: string;

	@IsNotEmpty()
	@IsNumber()
	rooms: number;

	@IsNotEmpty()
	location: {
		type: string;
		coordinates: [];
	};
}

import { Injectable } from '@nestjs/common';
import { MongoDbClient } from '../../database';
import { omit } from '../util';
import { UserAlreadyExistsException } from '../auth.exceptions';
import { User } from '../types';
import { UserDto } from './dto';
import { generalConfig } from '../../config';

const authTable = generalConfig.authTableName;

@Injectable()
export class UserDataService {
	constructor(private readonly mongoDbClient: MongoDbClient) {}
	async getUsers() {
		const Items = await this.mongoDbClient.queryItems(authTable, {});
		return Items;
	}

	async getUserById(id: string): Promise<User> {
		const result = await this.mongoDbClient.getItem(authTable, { id });
		return result as User;
	}

	async getUserByEmail(email: string): Promise<User> {
		const result = await this.mongoDbClient.getItem(authTable, { email });
		return result as User;
	}

	async saveUser(user: User) {
		const item = {
			_id: user.id,
			...user,
		};
		await this.mongoDbClient.addItem(authTable, item);
		return user;
	}

	async updateUser(user: UserDto) {
		const userExists = await this.getUserByEmail(user.email);
		if (userExists && user.id !== userExists.id) {
			throw new UserAlreadyExistsException();
		}
		return await this.mongoDbClient.updateItem(authTable, { _id: user.id }, user);
	}

	async deleteUser(user: UserDto) {
		return await this.mongoDbClient.deleteItem(authTable, { _id: user.id });
	}

	formatUser(item: User): User {
		return omit({
			id: item.id,
			...item,
			fullName: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
		});
	}
}

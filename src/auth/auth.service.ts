import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { v4 } from 'uuid';
import { InvalidCredentialsException, UserAlreadyExistsException, UserNotFoundException } from './auth.exceptions';
import { LoginDto, RegisterDto } from './dto';
import { User } from './types';
import { UserDataService } from './user';
import { hashPassword } from './util';

@Injectable()
export class AuthService {
	constructor(private readonly userDataService: UserDataService, private readonly jwtService: JwtService) {}
	async login(data: LoginDto) {
		const user = await this.userDataService.getUserByEmail(data.email);
		if (!user) {
			throw new UserNotFoundException();
		}

		const validPassword = await compare(data.password, user.password);
		if (validPassword) {
			return {
				token: this.createToken(user),
				user: this.stripUser(user),
			};
		}
		throw new InvalidCredentialsException();
	}

	async register(data: RegisterDto): Promise<User> {
		const userExists = await this.userDataService.getUserByEmail(data.email);
		if (userExists) {
			throw new UserAlreadyExistsException();
		}
		const user: User = {
			...data,
			id: v4(),
			password: await hashPassword(data.password),
		};
		console.log({ user });
		await this.userDataService.saveUser(user);
		return this.stripUser(user);
	}

	createToken(user: User) {
		return this.jwtService.sign({ id: user.id, email: user.email });
	}

	stripUser(user: User) {
		return this.userDataService.formatUser(user);
	}
}

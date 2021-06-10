import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserController, UserService, UserDataService } from './user';
import { generalConfig } from '../config';
import {MongoDbClient} from '../database/mongoDbClient'

@Module({
	imports: [
		JwtModule.register({
			secret: generalConfig.jwtSecret,
		}),
	],
	controllers: [AuthController, UserController],
	providers: [AuthService, UserService, UserDataService, JwtStrategy, MongoDbClient],
})
export class AuthModule {}

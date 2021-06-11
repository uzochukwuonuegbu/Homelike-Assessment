import { Injectable } from '@nestjs/common';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { generalConfig } from './config';

@Injectable()
export default class JWTService {
	getToken(payload: any, options?: SignOptions) {
		return jsonwebtoken.sign(payload, generalConfig.jwtSecret, options);
	}

	decodeToken(token: string): any {
		return jsonwebtoken.decode(token);
	}

	verifyToken(token: string): any {
		return jsonwebtoken.verify(token, generalConfig.jwtSecret);
	}
}

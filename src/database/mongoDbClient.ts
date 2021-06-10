import { Injectable } from '@nestjs/common';

// Import the MongoDB driver
import { MongoClient } from 'mongodb';
const MONGODB_URI = 'mongodb+srv://joe:IpgeTcFRn1UlHzZi@cluster0-0y0ib.mongodb.net/test?retryWrites=true&w=majority';
let cachedDb = null;

@Injectable()
export class MongoDbClient {
	constructor() {}

	async connectToDatabase() {
		if (cachedDb) {
			return cachedDb;
		}
		const mongoClient = new MongoClient(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		// Connect to our MongoDB database hosted on MongoDB Atlas
		const client = await mongoClient.connect();
		// Specify which database we want to use
		const db = await client.db('homelike');
		cachedDb = db;
		return db;
	}

	async getItem<T>(table: string, filter?: {}): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).findOne(filter);
		return response;
	}

	async queryItems<T>(table: string, filter?: {}): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		await db.collection(table).createIndex({ location: '2dsphere' });
		const response = await db
			.collection(table)
			.find(filter)
			.toArray();
		return response;
	}

	async addItem<T>(table: string, data: {}): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).insertOne(data);
		return response;
	}

	async batchAddItem<T>(table: string, data: []): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).insertMany(data);
		return response;
	}

	async updateItem<T>(table: string, query: {}, values: Partial<T>): Promise<void> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).updateOne(query, values);
		return response;
	}

	async deleteItem<T>(table: string, query: {}): Promise<void> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).deleteOne(query);
		return response;
	}
}

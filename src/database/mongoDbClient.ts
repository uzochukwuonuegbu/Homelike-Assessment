import { Injectable } from '@nestjs/common';

// Import the MongoDB driver
import { MongoClient, ObjectID } from 'mongodb';
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

	async getItem<T>(table: string, filter?: any): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const query = this.formatQueryId(filter);
		const response = await db.collection(table).findOne(query);
		return this.formatResponse([response]);
	}

	async queryItems<T>(table: string, filter?: {}): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const query = this.formatQueryId(filter);
		await db.collection(table).createIndex({ location: '2dsphere' });
		const response = await db
			.collection(table)
			.find(query)
			.toArray();
		return this.formatResponse(response);
	}

	async addItem<T>(table: string, data: {}): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).insertOne(data);
		return this.formatResponse([response]);
	}

	async batchAddItems<T>(table: string, data: []): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db.collection(table).insertMany(data);
		return this.formatResponse(response);
	}

	async batchGetItems<T>(table: string, ids: string[]): Promise<T | undefined> {
		const db = await this.connectToDatabase();
		const response = await db
			.collection(table)
			.find({ _id: { $in: ids.map((id) => ObjectID(id)) } })
			.toArray();
		return this.formatResponse(response);
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

	private formatQueryId<T>(filter: any) {
		const query = filter;
		if (query && query.id) {
			query._id = ObjectID(query.id);
			delete query.id;
		}
		return query;
	}

	private formatResponse<T>(data: any) {
		return data.map((x) => {
			x.id = x._id;
			delete x._id;
			return x;
		});
	}
}

export interface ApartmentConfig {
	name: string;
	city: string;
	country: string;
	rooms: number;
	location: ApartmentLocation;
}

interface ApartmentLocation {
	type: string;
	coordinates: number[];
}

export interface ApartmentSearchConfig {
	name?: string;
	city?: string;
	country?: string;
	rooms?: number;
	long?: number;
	lat?: number;
	nearestTo?: number;
	location?: {};
}

export enum GEOJsonType {
	Point = 'Point',
	LineString = 'LineString',
	Polygon = 'Polygon',
	MultiPoint = 'MultiPoint',
	MultiLineString = 'MultiLineString',
	MultiPolygon = 'MultiPolygon',
	GeometryCollection = 'GeometryCollection',
}

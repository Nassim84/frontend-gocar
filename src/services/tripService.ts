import axios from "axios";

const API_URL = "http://localhost:3000/api/trips";

const getAuthToken = () => {
	return localStorage.getItem("token");
};

const api = axios.create({
	baseURL: API_URL,
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
	},
});

export interface Driver {
	id: string;
	name: string;
}

export interface Passenger {
	firstname: string;
	id: string;
	name: string;
}

export interface Trip {
	id: string;
	startLocation: string;
	endLocation: string;
	departureDateTime: string;
	availableSeats: number;
	driver: Driver;
	passengers: Passenger[];
}

export interface TripData {
	startLocation: string;
	endLocation: string;
	departureDateTime: string;
	availableSeats: number;
	recurrence: string;
	recurringDays: string[];
}

export interface SearchParams {
	startLocation?: string;
	endLocation?: string;
	departureDateTime?: string;
}

export const getAllTrips = async (
	page: number,
	limit: number
): Promise<{ trips: Trip[]; totalPages: number; currentPage: number }> => {
	const response = await api.get("/", { params: { page, limit } });
	return response.data;
};

export const getUserTripsAsDriver = async (): Promise<Trip[]> => {
	const response = await api.get("/user/driver");
	return response.data;
};

export const getUserTripsAsPassenger = async (): Promise<Trip[]> => {
	const response = await api.get("/user/passenger");
	return response.data;
};

export const getTripById = async (id: string): Promise<Trip> => {
	const response = await api.get(`/${id}`);
	return response.data;
};

export const updateTrip = async (
	id: string,
	tripData: TripData
): Promise<Trip> => {
	const response = await axios.put(`${API_URL}/trips/${id}`, tripData);
	return response.data;
};

export const deleteTrip = async (id: string): Promise<void> => {
	await axios.delete(`${API_URL}/trips/${id}`);
};

export const searchTrips = async (
	searchParams: SearchParams
): Promise<Trip[]> => {
	const response = await api.get("/search", { params: searchParams });
	return response.data;
};

export const joinTrip = async (id: string): Promise<void> => {
	await api.post(`/${id}/join`);
};

export const leaveTrip = async (tripId: string): Promise<void> => {
	await api.delete(`/${tripId}/leave`);
};

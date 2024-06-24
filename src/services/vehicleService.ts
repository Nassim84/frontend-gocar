import axios from "axios";

const API_URL = "http://localhost:3000/api/vehicles";

const getAuthToken = () => {
	return localStorage.getItem("token");
};

const api = axios.create({
	baseURL: API_URL,
	headers: {
		Authorization: `Bearer ${getAuthToken()}`,
	},
});

export interface Vehicle {
	id: number;
	brand: string;
	model: string;
	color: string;
	numberOfSeats: number;
}

export interface VehicleData {
	brand: string;
	model: string;
	color: string;
	numberOfSeats: number;
}

export const createVehicle = async (
	vehicleData: VehicleData
): Promise<Vehicle> => {
	const response = await api.post("/", vehicleData);
	return response.data;
};

export const getUserVehicles = async (): Promise<Vehicle[]> => {
	const response = await api.get("/");
	return response.data;
};

export const getVehicleById = async (vehicleId: number): Promise<Vehicle> => {
	const response = await api.get(`/${vehicleId}`);
	return response.data;
};

export const updateVehicle = async (
	vehicleId: number,
	vehicleData: VehicleData
): Promise<Vehicle> => {
	const response = await api.put(`/${vehicleId}`, vehicleData);
	return response.data;
};

export const deleteVehicle = async (vehicleId: number): Promise<void> => {
	await api.delete(`/${vehicleId}`);
};

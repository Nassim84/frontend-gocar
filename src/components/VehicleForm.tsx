import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	createVehicle,
	updateVehicle,
	VehicleData,
	Vehicle,
} from "../services/vehicleService";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface VehicleFormProps {
	vehicle?: Vehicle;
	onSubmit: (vehicle: Vehicle) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicle, onSubmit }) => {
	const [brand, setBrand] = useState(vehicle?.brand || "");
	const [model, setModel] = useState(vehicle?.model || "");
	const [color, setColor] = useState(vehicle?.color || "");
	const [numberOfSeats, setNumberOfSeats] = useState(
		vehicle?.numberOfSeats || 0
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (vehicle) {
			setBrand(vehicle.brand);
			setModel(vehicle.model);
			setColor(vehicle.color);
			setNumberOfSeats(vehicle.numberOfSeats);
		}
	}, [vehicle]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const vehicleData: VehicleData = { brand, model, color, numberOfSeats };
		if (vehicle) {
			const updatedVehicle = await updateVehicle(vehicle.id, vehicleData);
			onSubmit(updatedVehicle);
		} else {
			const newVehicle = await createVehicle(vehicleData);
			onSubmit(newVehicle);
			navigate("/profile/vehicles");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<Card className=" p-8 shadow-xl bg-white rounded-lg transition-transform transform hover:scale-105">
				<h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
					{vehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="brand"
							className="block font-semibold mb-2 text-gray-700"
						>
							Marque
						</label>
						<InputText
							id="brand"
							value={brand}
							onChange={(e) => setBrand(e.target.value)}
							className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="model"
							className="block font-semibold mb-2 text-gray-700"
						>
							Modèle
						</label>
						<InputText
							id="model"
							value={model}
							onChange={(e) => setModel(e.target.value)}
							className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="color"
							className="block font-semibold mb-2 text-gray-700"
						>
							Couleur
						</label>
						<InputText
							id="color"
							value={color}
							onChange={(e) => setColor(e.target.value)}
							className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="numberOfSeats"
							className="block font-semibold mb-2 text-gray-700"
						>
							Nombre de sièges
						</label>
						<InputNumber
							id="numberOfSeats"
							value={numberOfSeats}
							onValueChange={(e) => setNumberOfSeats(e.value ?? 0)}
							className="w-full border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
							required
						/>
					</div>
					<div>
						<Button
							type="submit"
							label={vehicle ? "Modifier le véhicule" : "Ajouter le véhicule"}
							className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition duration-300"
						/>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default VehicleForm;

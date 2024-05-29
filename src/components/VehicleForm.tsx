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
		<Card className="p-4 shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{vehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
			</h2>
			<form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
				<div>
					<label htmlFor="brand" className="block font-bold mb-2">
						Marque
					</label>
					<InputText
						id="brand"
						value={brand}
						onChange={(e) => setBrand(e.target.value)}
						className="w-full"
					/>
				</div>
				<div>
					<label htmlFor="model" className="block font-bold mb-2">
						Modèle
					</label>
					<InputText
						id="model"
						value={model}
						onChange={(e) => setModel(e.target.value)}
						className="w-full"
					/>
				</div>
				<div>
					<label htmlFor="color" className="block font-bold mb-2">
						Couleur
					</label>
					<InputText
						id="color"
						value={color}
						onChange={(e) => setColor(e.target.value)}
						className="w-full"
					/>
				</div>
				<div>
					<label htmlFor="numberOfSeats" className="block font-bold mb-2">
						Nombre de sièges
					</label>
					<InputNumber
						id="numberOfSeats"
						value={numberOfSeats}
						onValueChange={(e) => setNumberOfSeats(e.value ?? 0)}
						className="w-full"
					/>
				</div>
				<div className="col-span-2">
					<Button
						type="submit"
						label={vehicle ? "Modifier le véhicule" : "Ajouter le véhicule"}
						className="w-full"
					/>
				</div>
			</form>
		</Card>
	);
};

export default VehicleForm;

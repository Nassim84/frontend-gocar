import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	createVehicle,
	updateVehicle,
	getVehicleById,
	VehicleData,
} from "../services/vehicleService";

const VehicleForm: React.FC = () => {
	const [brand, setBrand] = useState("");
	const [model, setModel] = useState("");
	const [color, setColor] = useState("");
	const [numberOfSeats, setNumberOfSeats] = useState(0);
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;

	useEffect(() => {
		if (isEditMode) {
			const fetchVehicle = async () => {
				const vehicle = await getVehicleById(Number(id));
				setBrand(vehicle.brand);
				setModel(vehicle.model);
				setColor(vehicle.color);
				setNumberOfSeats(vehicle.numberOfSeats);
			};
			fetchVehicle();
		}
	}, [id, isEditMode]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const vehicleData: VehicleData = { brand, model, color, numberOfSeats };
		if (isEditMode) {
			await updateVehicle(Number(id), vehicleData);
		} else {
			await createVehicle(vehicleData);
		}
		navigate("/profile/vehicles");
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Ajoutez les champs du formulaire */}
			<button type="submit">
				{isEditMode ? "Update Vehicle" : "Add Vehicle"}
			</button>
		</form>
	);
};

export default VehicleForm;

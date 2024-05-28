import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	getUserVehicles,
	deleteVehicle,
	Vehicle,
} from "../services/vehicleService";

const VehicleList: React.FC = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	useEffect(() => {
		const fetchVehicles = async () => {
			const data = await getUserVehicles();
			setVehicles(data);
		};
		fetchVehicles();
	}, []);

	const handleDelete = async (vehicleId: number) => {
		await deleteVehicle(vehicleId);
		setVehicles(vehicles.filter((v) => v.id !== vehicleId));
	};

	return (
		<div>
			<h2>My Vehicles</h2>
			<Link to="add">Add Vehicle</Link>
			<ul>
				{vehicles.map((vehicle) => (
					<li key={vehicle.id}>
						{vehicle.brand} {vehicle.model}
						<Link to={`edit/${vehicle.id}`}>Edit</Link>
						<button onClick={() => handleDelete(vehicle.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default VehicleList;

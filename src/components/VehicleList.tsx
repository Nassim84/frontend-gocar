import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
	getUserVehicles,
	deleteVehicle,
	Vehicle,
} from "../services/vehicleService";
import VehicleForm from "./VehicleForm";

const VehicleList: React.FC = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
		undefined
	);
	const [modalOpen, setModalOpen] = useState(false);

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

	const handleEdit = (vehicle: Vehicle) => {
		setSelectedVehicle(vehicle);
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setSelectedVehicle(undefined);
		setModalOpen(false);
	};

	const handleVehicleUpdate = (updatedVehicle: Vehicle) => {
		setVehicles(
			vehicles.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
		);
		setModalOpen(false);
	};

	const actionBodyTemplate = (rowData: Vehicle) => {
		return (
			<>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-text"
					onClick={() => handleEdit(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-text p-button-danger"
					onClick={() => handleDelete(rowData.id)}
				/>
			</>
		);
	};

	return (
		<div>
			<div className="flex justify-between mb-4">
				<h2 className="text-2xl font-bold">Mes véhicules</h2>
				<Link to="/profile/vehicles/add">
					<Button
						label="Ajouter un véhicule"
						icon="pi pi-plus"
						className="p-button-rounded"
					/>
				</Link>
			</div>
			<DataTable value={vehicles} responsiveLayout="scroll">
				<Column field="brand" header="Marque" />
				<Column field="model" header="Modèle" />
				<Column field="color" header="Couleur" />
				<Column field="numberOfSeats" header="Nombre de sièges" />
				<Column body={actionBodyTemplate} style={{ minWidth: "8rem" }} />
			</DataTable>

			<Dialog
				visible={modalOpen}
				onHide={handleModalClose}
				header="Modifier le véhicule"
			>
				<VehicleForm vehicle={selectedVehicle} onSubmit={handleVehicleUpdate} />
			</Dialog>
		</div>
	);
};

export default VehicleList;

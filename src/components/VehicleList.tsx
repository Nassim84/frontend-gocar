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
import NoVehiclesMessage from "./NoVehiclesMessage";

const VehicleList: React.FC = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
		undefined
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
	const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | undefined>(
		undefined
	);

	useEffect(() => {
		const fetchVehicles = async () => {
			const data = await getUserVehicles();
			setVehicles(data);
		};
		fetchVehicles();
	}, []);

	const handleDelete = (vehicle: Vehicle) => {
		setVehicleToDelete(vehicle);
		setDeleteConfirmationOpen(true);
	};

	const confirmDelete = async () => {
		if (vehicleToDelete) {
			await deleteVehicle(vehicleToDelete.id);
			setVehicles(vehicles.filter((v) => v.id !== vehicleToDelete.id));
			setDeleteConfirmationOpen(false);
		}
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
					className="p-button-rounded p-button-text p-button-info mr-2"
					onClick={() => handleEdit(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-text p-button-danger"
					onClick={() => handleDelete(rowData)}
				/>
			</>
		);
	};

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold">Mes véhicules</h2>
				<Link to="/profile/vehicles/add">
					<Button
						label="Ajouter un véhicule"
						icon="pi pi-plus"
						className="p-button-rounded p-button-success"
					/>
				</Link>
			</div>
			<DataTable
				value={vehicles}
				responsiveLayout="scroll"
				className="mt-4"
				emptyMessage={<NoVehiclesMessage />}
			>
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
				className="w-11/12 md:w-1/2 lg:w-1/3"
			>
				<VehicleForm vehicle={selectedVehicle} onSubmit={handleVehicleUpdate} />
			</Dialog>

			<Dialog
				visible={deleteConfirmationOpen}
				onHide={() => setDeleteConfirmationOpen(false)}
				header="Confirmation de suppression"
				className="w-11/12 md:w-1/2 lg:w-1/3"
			>
				<p className="mb-6">Êtes-vous sûr de vouloir supprimer ce véhicule ?</p>
				<div className="flex justify-end">
					<Button
						label="Oui"
						icon="pi pi-check"
						onClick={confirmDelete}
						autoFocus
						className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
					/>
					<Button
						label="Non"
						icon="pi pi-times"
						onClick={() => setDeleteConfirmationOpen(false)}
						className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
					/>
				</div>
			</Dialog>
		</div>
	);
};

export default VehicleList;

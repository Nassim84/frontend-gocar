import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleForm from "./../../components/VehicleForm";
import VehicleList from "./../../components/VehicleList";

const Vehicles: React.FC = () => {
	return (
		<div>
			<h1>Vehicles</h1>
			<Routes>
				<Route index element={<VehicleList />} />
				<Route path="add" element={<VehicleForm />} />
				<Route path="edit/:id" element={<VehicleForm />} />
			</Routes>
		</div>
	);
};

export default Vehicles;

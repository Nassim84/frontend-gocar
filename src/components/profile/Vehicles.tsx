import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleForm from "./../../components/VehicleForm";
import VehicleList from "./../../components/VehicleList";

const Vehicles: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route index element={<VehicleList />} />
				<Route path="add" element={<VehicleForm onSubmit={() => {}} />} />
			</Routes>
		</div>
	);
};

export default Vehicles;

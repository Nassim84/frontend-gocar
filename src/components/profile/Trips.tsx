import React from "react";
import { Routes, Route } from "react-router-dom";
import DriverTrips from "../../components/trips/DriverTrips";
import PassengerTrips from "../../components/trips/DriverTrips";

const App: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route path="driver" element={<DriverTrips />} />
				<Route path="passenger" element={<PassengerTrips />} />
			</Routes>
		</div>
	);
};

export default App;

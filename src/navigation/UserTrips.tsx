// UserTrips.tsx
import React, { useEffect, useState } from "react";
import {
	getUserTripsAsDriver,
	getUserTripsAsPassenger,
	Trip,
} from "../services/tripService";
import DriverTrips from "../components/trips/DriverTrips";
import PassengerTrips from "../components/trips/PassengerTrips";

const UserTrips: React.FC = () => {
	const [driverTrips, setDriverTrips] = useState<Trip[]>([]);
	const [passengerTrips, setPassengerTrips] = useState<Trip[]>([]);
	const [activeTab, setActiveTab] = useState<"driver" | "passenger">("driver");

	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const driverTripsData = await getUserTripsAsDriver();
				setDriverTrips(driverTripsData);
				const passengerTripsData = await getUserTripsAsPassenger();
				setPassengerTrips(passengerTripsData);
			} catch (error) {
				console.error("Error fetching user trips:", error);
			}
		};
		fetchTrips();
	}, []);

	return (
		<div className="max-w-4xl mx-auto py-8">
			<h2 className="text-3xl font-bold text-gray-800 mb-6">Mes Trajets</h2>
			<div className="mb-6">
				<button
					onClick={() => setActiveTab("driver")}
					className={`mr-4 py-2 px-4 rounded-lg transition-colors ${
						activeTab === "driver"
							? "bg-blue-500 text-white"
							: "bg-gray-200 hover:bg-gray-300"
					}`}
				>
					Conducteur
				</button>
				<button
					onClick={() => setActiveTab("passenger")}
					className={`py-2 px-4 rounded-lg transition-colors ${
						activeTab === "passenger"
							? "bg-blue-500 text-white"
							: "bg-gray-200 hover:bg-gray-300"
					}`}
				>
					Passager
				</button>
			</div>
			{activeTab === "driver" ? (
				<DriverTrips driverTrips={driverTrips} />
			) : (
				<PassengerTrips passengerTrips={passengerTrips} />
			)}
		</div>
	);
};

export default UserTrips;

// UserTrips.tsx
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
				<Link
					to="driver"
					className="mr-4 py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
				>
					Conducteur
				</Link>
				<Link
					to="passenger"
					className="py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
				>
					Passager
				</Link>
			</div>
			<Outlet />
			<DriverTrips driverTrips={driverTrips} />
			<PassengerTrips passengerTrips={passengerTrips} />
		</div>
	);
};

export default UserTrips;

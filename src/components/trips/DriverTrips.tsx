// DriverTrips.tsx
import React from "react";
import { Trip } from "../../services/tripService";

interface DriverTripsProps {
	driverTrips: Trip[];
}

const DriverTrips: React.FC<DriverTripsProps> = ({ driverTrips }) => {
	return (
		<div>
			<h3 className="text-xl font-semibold text-gray-700 mb-4">
				En tant que conducteur
			</h3>
			{driverTrips.length > 0 ? (
				<ul className="space-y-2">
					{driverTrips.map((trip) => (
						<li
							key={trip.id}
							className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
						>
							<span className="font-semibold">{trip.startLocation}</span> -{" "}
							<span className="font-semibold">{trip.endLocation}</span>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-600">Aucun trajet en tant que conducteur.</p>
			)}
		</div>
	);
};

export default DriverTrips;

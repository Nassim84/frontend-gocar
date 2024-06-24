// PassengerTrips.tsx
import React from "react";
import { Trip } from "../../services/tripService";

interface PassengerTripsProps {
	passengerTrips: Trip[];
}

const PassengerTrips: React.FC<PassengerTripsProps> = ({ passengerTrips }) => {
	return (
		<div>
			<h3 className="text-xl font-semibold text-gray-700 mb-4">
				En tant que passager
			</h3>
			{passengerTrips.length > 0 ? (
				<ul className="space-y-2">
					{passengerTrips.map((trip) => (
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
				<p className="text-gray-600">Aucun trajet en tant que passager.</p>
			)}
		</div>
	);
};

export default PassengerTrips;

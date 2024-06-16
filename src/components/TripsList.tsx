// components/TripsList.tsx
import React, { useEffect, useState } from "react";
import { getAllTrips, Trip } from "../services/tripService";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TripsList: React.FC = () => {
	const [trips, setTrips] = useState<Trip[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const tripsPerPage = 5;

	useEffect(() => {
		const fetchTrips = async () => {
			try {
				const response = await getAllTrips(currentPage, tripsPerPage);
				setTrips(response.trips);
				setTotalPages(response.totalPages);
				setCurrentPage(response.currentPage);
			} catch (error) {
				console.error("Erreur lors de la récupération des trajets :", error);
				toast.error("Échec de la récupération des trajets");
			}
		};

		fetchTrips();
	}, [currentPage]);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
			<ToastContainer />
			<h2 className="text-3xl font-extrabold text-gray-900 mb-8">
				Available Trips
			</h2>
			<div className="w-full max-w-2xl mb-6">
				<Link to="/create-trip">
					<button className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-green-600 transition-all duration-200">
						Create Trip
					</button>
				</Link>
			</div>
			<div className="w-full max-w-2xl space-y-6">
				{trips.map((trip) => (
					<div
						key={trip.id}
						className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105"
					>
						<h3 className="text-xl font-bold mb-2">
							{trip.startLocation} to {trip.endLocation}
						</h3>
						<p className="text-gray-700">
							<strong>Departure:</strong>{" "}
							{new Date(trip.departureDateTime).toLocaleString()}
						</p>
						<p className="text-gray-700">
							<strong>Seats Available:</strong> {trip.availableSeats}
						</p>
						<Link
							to={`/trips/${trip.id}`}
							className="text-indigo-600 hover:text-indigo-800 hover:underline mt-4 inline-block"
						>
							View Details
						</Link>
					</div>
				))}
			</div>
			<div className="flex justify-between mt-8 w-full max-w-2xl">
				<button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
				>
					Page précédente
				</button>
				<span className="self-center">
					Page {currentPage} sur {totalPages}
				</span>
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
				>
					Page suivante
				</button>
			</div>
		</div>
	);
};

export default TripsList;

import React, { useEffect, useState } from "react";
import { getAllTrips, Trip } from "../services/tripService";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

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
				Trajets disponibles
			</h2>
			<div className="w-full max-w-2xl mb-6">
				<Link to="/create-trip">
					<Button
						label="Créer un trajet"
						className="p-button-success"
						icon="pi pi-plus"
					/>
				</Link>
			</div>
			<div className="w-full max-w-2xl space-y-6">
				{trips.length === 0 ? (
					<Message
						severity="info"
						text="Aucun trajet disponible pour le moment."
						className="w-full"
					/>
				) : (
					trips.map((trip) => (
						<div
							key={trip.id}
							className="bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
						>
							<h3 className="text-lg font-bold text-gray-800 mb-3">
								{trip.startLocation}{" "}
								<span className="text-blue-500">&rarr;</span> {trip.endLocation}
							</h3>
							<div className="text-base text-gray-600 mb-4">
								<p>
									<span className="font-semibold">Départ:</span>{" "}
									{new Date(trip.departureDateTime).toLocaleDateString("fr-FR")}{" "}
									{new Date(trip.departureDateTime)
										.toLocaleTimeString("fr-FR", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										})
										.replace(":", " ")}
								</p>
								<p>
									<span className="font-semibold">Places:</span>{" "}
									{trip.availableSeats}
								</p>
							</div>
							<Link
								to={`/trips/${trip.id}`}
								className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
							>
								Voir les détails
							</Link>
						</div>
					))
				)}
			</div>
			<div className="flex justify-between mt-8 w-full max-w-2xl">
				<Button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					label="Page précédente"
					icon="pi pi-chevron-left"
					className="p-button-info"
				/>
				<span className="self-center">
					Page {currentPage} sur {totalPages}
				</span>
				<Button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					label="Page suivante"
					icon="pi pi-chevron-right"
					iconPos="right"
					className="p-button-info"
				/>
			</div>
		</div>
	);
};

export default TripsList;

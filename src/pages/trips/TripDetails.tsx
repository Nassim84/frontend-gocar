import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	getTripById,
	joinTrip,
	leaveTrip,
	Trip,
} from "../../services/tripService";

const TripDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [trip, setTrip] = useState<Trip | null>(null);

	useEffect(() => {
		const fetchTrip = async () => {
			try {
				const tripData = await getTripById(id!);
				setTrip(tripData);
			} catch (error) {
				console.error("Error fetching trip details:", error);
			}
		};

		fetchTrip();
	}, [id]);

	const handleJoinTrip = async () => {
		if (!trip) return;

		try {
			await joinTrip(id!);
			// Update trip data locally
			const updatedTrip = await getTripById(id!);
			setTrip(updatedTrip);
			toast.success("Vous avez rejoint le voyage avec succès !");
		} catch (error) {
			console.error("Error joining trip:", error);
			toast.error("Échec de l'inscription au voyage.");
		}
	};

	const handleLeaveTrip = async () => {
		if (!trip) return;

		try {
			await leaveTrip(id!);
			// Update trip data locally
			const updatedTrip = await getTripById(id!);
			setTrip(updatedTrip);
			toast.success("Vous avez quitté le voyage avec succès !");
		} catch (error) {
			console.error("Error leaving trip:", error);
			toast.error("Échec de la sortie du voyage.");
		}
	};

	if (!trip)
		return (
			<div className="flex justify-center items-center h-screen bg-gray-100 text-xl">
				Chargement...
			</div>
		);

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md transform transition-transform duration-300 hover:scale-105">
				<h2 className="text-2xl font-bold mb-4">Détails du Voyage</h2>
				<p className="mb-2">
					<strong>Départ :</strong> {trip.startLocation}
				</p>
				<p className="mb-2">
					<strong>Arrivée :</strong> {trip.endLocation}
				</p>
				<p className="mb-2">
					<strong>Départ :</strong>{" "}
					{new Date(trip.departureDateTime).toLocaleString()}
				</p>
				<p className="mb-4">
					<strong>Places Disponibles :</strong> {trip.availableSeats}
				</p>
				<div className="flex justify-between mb-4">
					<button
						onClick={handleJoinTrip}
						disabled={trip.availableSeats === 0}
						className={`py-2 px-4 rounded-full text-white transition-all duration-200 ${
							trip.availableSeats === 0
								? "bg-gray-400 cursor-not-allowed"
								: "bg-green-500 hover:bg-green-600"
						}`}
					>
						Rejoindre le Voyage
					</button>
					<button
						onClick={handleLeaveTrip}
						className="py-2 px-4 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
					>
						Quitter le Voyage
					</button>
				</div>
				<h3 className="text-xl font-semibold mb-4">Passagers</h3>
				<div className="space-y-4">
					{trip.passengers.map((passenger) => (
						<div
							key={passenger.id}
							className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow"
						>
							<img
								src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
									passenger.firstname.charAt(0) + passenger.name.charAt(0)
								)}&chars=2`}
								alt={`${passenger.firstname} ${passenger.name}`}
								className="w-12 h-12 rounded-full"
							/>
							<div>
								<p className="text-lg font-medium">
									{passenger.firstname} {passenger.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default TripDetails;

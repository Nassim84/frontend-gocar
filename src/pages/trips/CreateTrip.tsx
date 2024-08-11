import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

enum Recurrence {
	Unique = "unique",
	Weekly = "weekly",
	Biweekly = "biweekly",
}

interface TripData {
	startLocation: string;
	endLocation: string;
	departureDateTime: string;
	availableSeats: number;
	recurrence: Recurrence | "";
	recurringDays: string[];
}

const CreateTrip: React.FC = () => {
	const [tripData, setTripData] = useState<TripData>({
		startLocation: "",
		endLocation: "",
		departureDateTime: "",
		availableSeats: 0,
		recurrence: "",
		recurringDays: [],
	});

	const navigate = useNavigate();

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setTripData({ ...tripData, [name]: value });
	};

	const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseInt(e.target.value) : 0;
		setTripData({ ...tripData, availableSeats: value });
	};

	const handleRecurringDaysChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value.split(",").map((day) => day.trim());
		setTripData({ ...tripData, recurringDays: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");

			// Vérification de la validité de la date de départ
			const now = new Date().toISOString();
			if (tripData.departureDateTime < now) {
				throw new Error(
					"La date de départ ne peut pas être antérieure à aujourd'hui."
				);
			}

			// Conversion des jours récurrents en chaîne si nécessaire
			const tripDataToSend = {
				...tripData,
				recurringDays: tripData.recurringDays.join(", "), // Convertir en chaîne
			};

			await axios.post("/api/trips", tripDataToSend, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			navigate("/trips");
		} catch (error) {
			console.error("Erreur lors de la création du voyage:", error);
			if (error instanceof Error) {
				toast.error(`Erreur: ${error.message}`);
			} else {
				toast.error("Une erreur inconnue est survenue.");
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<ToastContainer />
			<div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
				<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
					Créer un voyage
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label
							htmlFor="startLocation"
							className="block mb-2 font-semibold text-gray-700"
						>
							Lieu de départ
						</label>
						<input
							type="text"
							id="startLocation"
							name="startLocation"
							value={tripData.startLocation}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="endLocation"
							className="block mb-2 font-semibold text-gray-700"
						>
							Lieu d'arrivée
						</label>
						<input
							type="text"
							id="endLocation"
							name="endLocation"
							value={tripData.endLocation}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="departureDateTime"
							className="block mb-2 font-semibold text-gray-700"
						>
							Date et heure de départ
						</label>
						<input
							type="datetime-local"
							id="departureDateTime"
							name="departureDateTime"
							value={tripData.departureDateTime}
							onChange={handleChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="availableSeats"
							className="block mb-2 font-semibold text-gray-700"
						>
							Places disponibles
						</label>
						<input
							type="number"
							id="availableSeats"
							name="availableSeats"
							value={tripData.availableSeats}
							onChange={handleSeatsChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="recurrence"
							className="block font-semibold mb-2 text-gray-700"
						>
							Récurrence
						</label>
						<select
							id="recurrence"
							name="recurrence"
							value={tripData.recurrence}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						>
							<option value="">Sélectionner une récurrence</option>
							<option value={Recurrence.Unique}>Unique</option>
							<option value={Recurrence.Weekly}>Hebdomadaire</option>
							<option value={Recurrence.Biweekly}>Bi-hebdomadaire</option>
						</select>
					</div>
					<div className="mb-6">
						<label
							htmlFor="recurringDays"
							className="block font-semibold mb-2 text-gray-700"
						>
							Jours récurrents (séparés par des virgules)
						</label>
						<input
							type="text"
							id="recurringDays"
							name="recurringDays"
							value={tripData.recurringDays.join(", ")}
							onChange={handleRecurringDaysChange}
							className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
						/>
					</div>
					<button
						type="submit"
						className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Créer le voyage
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateTrip;

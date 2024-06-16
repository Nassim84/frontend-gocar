import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { AuthContext } from "../../context/AuthContext";

interface User {
	id: number;
	name: string;
	firstname: string;
	email: string;
	campus: string;
}

const campuses = [
	{ label: "Avignon", value: "Avignon" },
	{ label: "Pertuis", value: "Pertuis" },
];

const Management: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [name, setName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [campus, setCampus] = useState("");
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const fetchUserProfile = async () => {
		try {
			const response = await axiosInstance.get<User>("/api/users/profile");
			setUser(response.data);
			setName(response.data.name);
			setFirstname(response.data.firstname);
			setEmail(response.data.email);
			setCampus(response.data.campus);
		} catch (error) {
			console.error("Error fetching user profile:", error);
		}
	};

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await axiosInstance.put("/api/users/profile", {
				name,
				firstname,
				email,
				campus,
			});
			fetchUserProfile();
			setShowUpdateModal(false);
			toast.success("Profil mis à jour avec succès !");
		} catch (error) {
			console.error("Error updating profile:", error);
			toast.error("Échec de la mise à jour du profil !");
		}
	};

	const handleDeleteAccount = async () => {
		try {
			await axiosInstance.delete("/api/users/profile");
			logout();
			toast.success("Compte supprimé avec succès !");
			navigate("/");
		} catch (error) {
			console.error("Error deleting account:", error);
			toast.error("Échec de la suppression du compte !");
		}
	};

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ProgressSpinner />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<ToastContainer />
			<h1 className="text-4xl font-bold mb-6">Mon profile</h1>
			<form className="space-y-4">
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">Nom:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">Prenom:</label>
					<input
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">Campus:</label>
					<Dropdown
						value={campus}
						options={campuses}
						onChange={(e) => setCampus(e.value)}
						placeholder="Sélectionnez un campus"
						className="border border-gray-300 rounded-md p-2"
					/>
				</div>
				<button
					type="button"
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
					onClick={() => setShowUpdateModal(true)}
				>
					Mettre à jour
				</button>
			</form>
			<button
				onClick={() => setShowDeleteModal(true)}
				className="bg-red-500 text-white font-bold py-2 px-4 rounded-md mt-4"
			>
				Supprimer mon compte
			</button>

			<Dialog
				header="Mise à jour du profil"
				visible={showUpdateModal}
				style={{ width: "50vw" }}
				modal
				onHide={() => setShowUpdateModal(false)}
			>
				<form onSubmit={handleUpdateProfile}>
					<div className="flex flex-col">
						<label className="text-lg font-medium mb-1">Nom:</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="border border-gray-300 rounded-md p-2"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-lg font-medium mb-1">Prenom:</label>
						<input
							type="text"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							className="border border-gray-300 rounded-md p-2"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-lg font-medium mb-1">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="border border-gray-300 rounded-md p-2"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-lg font-medium mb-1">Campus:</label>
						<Dropdown
							value={campus}
							options={campuses}
							onChange={(e) => setCampus(e.value)}
							placeholder="Sélectionnez un campus"
							className="border border-gray-300 rounded-md p-2"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4"
					>
						Enregistrer
					</button>
				</form>
			</Dialog>

			<Dialog
				header="Confirmer la suppresion"
				visible={showDeleteModal}
				style={{ width: "30vw" }}
				modal
				onHide={() => setShowDeleteModal(false)}
			>
				<p>Vous êtes sûr de supprimer votre compte?</p>
				<div className="flex justify-end space-x-2 mt-4">
					<button
						onClick={handleDeleteAccount}
						className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
					>
						Oui, supprimer
					</button>
					<button
						onClick={() => setShowDeleteModal(false)}
						className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
					>
						Annuler
					</button>
				</div>
			</Dialog>
		</div>
	);
};

export default Management;

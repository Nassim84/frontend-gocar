import React, { useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { Dialog } from "primereact/dialog";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface ChangePasswordProps {
	visible: boolean;
	onHide: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ visible, onHide }) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword !== confirmNewPassword) {
			toast.error("Les nouveaux mots de passe ne correspondent pas");
			return;
		}
		try {
			await axiosInstance.put("/api/users/change-password", {
				currentPassword,
				newPassword,
			});
			toast.success("Mot de passe changé avec succès");
			onHide();
			setCurrentPassword("");
			setNewPassword("");
			setConfirmNewPassword("");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (axiosError.response) {
					if (axiosError.response.status === 400 && axiosError.response.data) {
						const errorMessage = (
							axiosError.response.data as { error?: string }
						).error;
						if (errorMessage) {
							toast.error(errorMessage);
						} else {
							toast.error("Erreur lors du changement de mot de passe.");
						}
					} else {
						toast.error("Erreur de réponse du serveur.");
					}
				} else {
					toast.error("Erreur inconnue lors du changement de mot de passe.");
				}
			} else {
				toast.error("Erreur inconnue.");
			}
		}
	};

	return (
		<Dialog
			header="Changer le mot de passe"
			visible={visible}
			style={{ width: "50vw" }}
			modal
			onHide={onHide}
		>
			<form onSubmit={handleChangePassword} className="space-y-4">
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">
						Mot de passe actuel:
					</label>
					<input
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">
						Nouveau mot de passe:
					</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-lg font-medium mb-1">
						Confirmer le nouveau mot de passe:
					</label>
					<input
						type="password"
						value={confirmNewPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
						className="border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4"
				>
					Changer le mot de passe
				</button>
			</form>
		</Dialog>
	);
};

export default ChangePassword;

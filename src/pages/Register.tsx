import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
	const [name, setName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const [campus, setCampus] = useState("");
	const navigate = useNavigate();

	const roleOptions = [
		{ label: "Admin", value: "admin" },
		{ label: "Etudiant", value: "student" },
	];

	const campusOptions = [
		{ label: "Avignon", value: "Avignon" },
		{ label: "Pertuis", value: "Pertuis" },
	];

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!name || !firstname || !email || !password || !role || !campus) {
			toast.error("Veuillez remplir tous les champs.");
			return;
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (!passwordRegex.test(password)) {
			toast.error(
				"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre."
			);
			return;
		}

		try {
			await axios.post("/api/auth/register", {
				name,
				firstname,
				email,
				password,
				role,
				campus,
			});
			toast.success("Inscription réussie !");
			navigate("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (
					axiosError.response &&
					axiosError.response.data &&
					(axiosError.response.data as { error: string }).error ===
						"Email already exists"
				) {
					toast.error("Cet e-mail est déjà utilisé.");
				} else {
					console.error("Registration failed", axiosError);
					toast.error("L'inscription a échoué. Veuillez réessayer.");
				}
			} else {
				console.error("Registration failed", error);
				toast.error("L'inscription a échoué. Veuillez réessayer.");
			}
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<ToastContainer />
			<div className="w-full max-w-md">
				<div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
					<h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
					<form onSubmit={handleRegister}>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-bold mb-2"
							>
								Nom
							</label>
							<InputText
								id="name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="firstname"
								className="block text-gray-700 font-bold mb-2"
							>
								Prénom
							</label>
							<InputText
								id="firstname"
								type="text"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-2"
							>
								Email
							</label>
							<InputText
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-gray-700 font-bold mb-2"
							>
								Mot de passe
							</label>
							<InputText
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="role"
								className="block text-gray-700 font-bold mb-2"
							>
								Rôle
							</label>
							<Dropdown
								id="role"
								value={role}
								onChange={(e) => setRole(e.value)}
								options={roleOptions}
								optionLabel="label"
								optionValue="value"
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="campus"
								className="block text-gray-700 font-bold mb-2"
							>
								Campus
							</label>
							<Dropdown
								id="campus"
								value={campus}
								onChange={(e) => setCampus(e.value)}
								options={campusOptions}
								optionLabel="label"
								optionValue="value"
								className="w-full border border-gray-300 rounded-md px-3 py-2"
								required
							/>
						</div>
						<div className="flex items-center justify-between">
							<Button
								type="submit"
								label="S'inscrire"
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;

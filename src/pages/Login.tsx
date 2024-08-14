import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"https://backendgocar-production-c627.up.railway.app/api/auth/login",
				{ email, password }
			);
			login(response.data.token);
			navigate("/profile");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError;
				if (
					axiosError.response &&
					axiosError.response.status === 400 &&
					axiosError.response.data &&
					(axiosError.response.data as { error: string }).error ===
						"Invalid email or password"
				) {
					toast.error("Email ou mot de passe invalide.");
				} else {
					console.error("Login failed", axiosError);
					toast.error("La connexion a échoué. Veuillez réessayer.");
				}
			} else {
				console.error("Login failed", error);
				toast.error("La connexion a échoué. Veuillez réessayer.");
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Connexion
				</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-semibold mb-2"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-semibold mb-2"
						>
							Mot de passe
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
					>
						Se connecter
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Login;

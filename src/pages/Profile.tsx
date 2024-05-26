import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

interface User {
	id: number;
	name: string;
	firstname: string;
	email: string;
	campus: string;
}

const Profile: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [name, setName] = useState("");
	const [firstname, setFirstname] = useState("");
	const [email, setEmail] = useState("");
	const [campus, setCampus] = useState("");
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
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const handleDeleteAccount = async () => {
		if (window.confirm("Are you sure you want to delete your account?")) {
			try {
				await axiosInstance.delete("/api/users/profile");
				navigate("/login");
			} catch (error) {
				console.error("Error deleting account:", error);
			}
		}
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto">
			<h1 className="text-4xl font-bold mb-4">User Profile</h1>
			<form onSubmit={handleUpdateProfile}>
				<div>
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label>Firstname:</label>
					<input
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
					/>
				</div>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label>Campus:</label>
					<input
						type="text"
						value={campus}
						onChange={(e) => setCampus(e.target.value)}
					/>
				</div>
				<button type="submit">Update Profile</button>
			</form>
			<button onClick={handleDeleteAccount}>Delete Account</button>
		</div>
	);
};

export default Profile;

import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { Button } from "primereact/button";

const Profile: React.FC = () => {
	const location = useLocation();

	return (
		<div className="flex">
			<nav className="w-1/4 bg-gray-100 min-h-screen p-4">
				<Link
					to=""
					className={`mb-4 block ${
						location.pathname === "/profile" ? "active" : ""
					}`}
				>
					<Button
						label="Management"
						icon="pi pi-briefcase"
						className="p-button-text p-button-plain w-full justify-start py-7 text-lg"
					/>
				</Link>
				<Link
					to="vehicles"
					className={`block ${
						location.pathname === "/profile/vehicles" ? "active" : ""
					}`}
				>
					<Button
						label="Vehicles"
						icon="pi pi-car"
						className="p-button-text p-button-plain w-full justify-start py-7 text-lg"
					/>
				</Link>
			</nav>
			<div className="w-3/4 p-4">
				<div className="bg-white shadow rounded-lg p-4">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Profile;

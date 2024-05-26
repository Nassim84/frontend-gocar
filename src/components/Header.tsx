import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logoImage from "/logo.png";

const Navbar: React.FC = () => {
	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center">
						<Link to="/">
							<img src={logoImage} alt="Logo" className="h-12" />
						</Link>
					</div>
					<div className="flex items-center">
						{isAuthenticated ? (
							<>
								<Link
									to="/profile"
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-500"
								>
									Mon Profile
								</Link>
								<button
									onClick={logout}
									className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-500"
								>
									Déconnexion
								</button>
							</>
						) : (
							<>
								<Link
									to="/login"
									className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-500"
								>
									Connexion
								</Link>
								<Link
									to="/register"
									className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-blue-500"
								>
									Inscription
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

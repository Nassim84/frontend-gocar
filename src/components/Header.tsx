import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import logoImage from "/logo.png";

const Header: React.FC = () => {
	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link to="/">
							<img src={logoImage} alt="Logo" className="h-12" />
						</Link>
					</div>

					{/* Centered Links */}
					{isAuthenticated && (
						<div className="flex-grow flex justify-center">
							<Link to="/trips">
								<Button
									label="Mes Voyages"
									icon="pi pi-briefcase"
									className="p-button-text p-button-rounded p-button-plain"
								/>
							</Link>
						</div>
					)}

					{/* User Actions */}
					<div className="flex-shrink-0 flex items-center space-x-2">
						{isAuthenticated ? (
							<>
								<Link to="/profile">
									<Button
										label="Mon Profil"
										icon="pi pi-user"
										className="p-button-text p-button-rounded p-button-plain"
									/>
								</Link>
								<Button
									label="Déconnexion"
									icon="pi pi-sign-out"
									className="p-button-text p-button-rounded p-button-plain"
									onClick={logout}
								/>
							</>
						) : (
							<Link to="/login">
								<Button
									label="Connexion"
									icon="pi pi-sign-in"
									className="p-button-text p-button-rounded p-button-plain"
								/>
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;

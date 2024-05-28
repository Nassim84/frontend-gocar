import React from "react";
import { Link } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">GoCar</h3>
						<p className="text-gray-400">
							Une application incroyable qui révolutionne le monde.
						</p>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Liens rapides</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/">
									<Button
										label="Accueil"
										icon="pi pi-home"
										className="p-button-text p-button-plain text-gray-300 hover:text-white transition duration-300"
									/>
								</Link>
							</li>
							<li>
								<Link to="/about">
									<Button
										label="À propos"
										icon="pi pi-info-circle"
										className="p-button-text p-button-plain text-gray-300 hover:text-white transition duration-300"
									/>
								</Link>
							</li>
							<li>
								<Link to="/contact">
									<Button
										label="Contact"
										icon="pi pi-envelope"
										className="p-button-text p-button-plain text-gray-300 hover:text-white transition duration-300"
									/>
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Nous contacter</h3>
						<p className="text-gray-400 flex align-items-center mb-2">
							<i className="pi pi-map-marker mr-2"></i>
							123 Rue des Développeurs, 75000 Paris, France
						</p>
						<p className="text-gray-400 flex align-items-center mb-2">
							<i className="pi pi-envelope mr-2"></i>
							<a
								href="mailto:info@gocar.com"
								className="text-blue-500 hover:underline"
							>
								info@gocar.com
							</a>
						</p>
						<p className="text-gray-400 flex align-items-center">
							<i className="pi pi-phone mr-2"></i>
							+33 1 23 45 67 89
						</p>
					</div>
				</div>
				<Divider className="my-8 bg-gray-700" />
				<div className="text-center text-gray-400">
					&copy; {new Date().getFullYear()} GoCar. Tous droits réservés.
				</div>
			</div>
		</footer>
	);
};

export default Footer;

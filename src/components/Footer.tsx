import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">Mon Application</h3>
						<p className="text-gray-400">
							Une application incroyable qui révolutionne le monde.
						</p>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Liens rapides</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-white transition duration-300"
								>
									Accueil
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-300 hover:text-white transition duration-300"
								>
									À propos
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-gray-300 hover:text-white transition duration-300"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Nous contacter</h3>
						<p className="text-gray-400">
							123 Rue des Développeurs
							<br />
							75000 Paris, France
							<br />
							Email: info@monapplication.com
							<br />
							Téléphone: +33 1 23 45 67 89
						</p>
					</div>
				</div>
				<hr className="my-8 border-gray-700" />
				<div className="text-center text-gray-400">
					&copy; {new Date().getFullYear()} Mon Application. Tous droits
					réservés.
				</div>
			</div>
		</footer>
	);
};

export default Footer;

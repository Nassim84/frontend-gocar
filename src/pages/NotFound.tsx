import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-blue-600">404</h1>
					<p className="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Oups ! La page que vous recherchez n'existe pas.
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
						Il semblerait que vous ayez suivi un mauvais lien ou entré une URL
						qui n'existe pas sur ce site.
					</p>
					<div className="mt-10 flex justify-center">
						<Link
							to="/"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Retour à la page d'accueil
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;

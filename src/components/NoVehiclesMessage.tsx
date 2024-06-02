import React from "react";

const NoVehiclesMessage: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center h-full text-gray-500">
			<svg
				className="w-20 h-20 mb-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
				/>
			</svg>
			<h3 className="text-lg font-semibold">
				Vous n'avez pas encore ajouté de véhicule
			</h3>
			<p className="text-center">
				Commencez à ajouter vos véhicules pour les gérer facilement.
			</p>
		</div>
	);
};

export default NoVehiclesMessage;

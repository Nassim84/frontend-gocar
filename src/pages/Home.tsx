import React from "react";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Home: React.FC = () => {
	const features = [
		{
			title: "Covoiturage facile",
			description:
				"Trouvez rapidement des covoiturages avec d'autres étudiants.",
			icon: "pi pi-car",
		},
		{
			title: "Économisez de l'argent",
			description: "Partagez les frais de carburant et réduisez vos dépenses.",
			icon: "pi pi-money-bill",
		},
		{
			title: "Faites de nouvelles connaissances",
			description:
				"Rencontrez d'autres étudiants et élargissez votre cercle social.",
			icon: "pi pi-users",
		},
	];

	const responsiveOptions = [
		{
			breakpoint: "1024px",
			numVisible: 3,
			numScroll: 3,
		},
		{
			breakpoint: "768px",
			numVisible: 2,
			numScroll: 2,
		},
		{
			breakpoint: "560px",
			numVisible: 1,
			numScroll: 1,
		},
	];

	interface Feature {
		title: string;
		description: string;
		icon: string;
	}

	const featureTemplate = (feature: Feature) => {
		return (
			<Card title={feature.title} className="h-full">
				<div className="flex align-items-center justify-content-center mb-4">
					<i className={`${feature.icon} text-4xl text-primary`}></i>
				</div>
				<p className="text-center">{feature.description}</p>
			</Card>
		);
	};

	return (
		<div className="container mx-auto">
			<section className="hero py-8 flex flex-col lg:flex-row justify-around items-center">
				<div className="lg:w-1/2 mb-6 lg:mb-0">
					<h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-600  transition duration-300 ease-in-out">
						Bienvenue sur GoCar
					</h1>
					<p className="mb-3 pt-5 text-black dark:text-black first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-black dark:first-letter:text-black first-letter:me-3 first-letter:float-start">
						La plateforme de covoiturage pour les étudiants.
					</p>

					<p className="text-gray-500 dark:text-gray-400 animate-gradient-text">
						Trajets partagés, sourires partagés
					</p>
				</div>
				<div className="lg:w-1/2 flex justify-end">
					<img
						src="/home.png"
						alt="GoCar"
						className="animate__animated animate__fadeInRight w-full lg:w-auto"
					/>
				</div>
			</section>

			<section className="features py-8">
				<h2 className="text-3xl font-bold mb-6 text-center">
					Pourquoi choisir GoCar ?
				</h2>
				<Carousel
					value={features}
					numVisible={3}
					numScroll={1}
					responsiveOptions={responsiveOptions}
					itemTemplate={featureTemplate}
					circular
					autoplayInterval={5000}
				/>
			</section>
		</div>
	);
};

export default Home;

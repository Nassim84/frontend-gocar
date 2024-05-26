import React from "react";

const About: React.FC = () => {
	return (
		<div className="bg-gray-100 min-h-screen py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
						À propos de nous
					</h2>
					<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Nous révolutionnons le monde, un trajet à la fois
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						Chez Mon Application, nous croyons en la puissance de la technologie
						pour transformer la façon dont les gens se déplacent. Notre mission
						est de rendre les voyages plus faciles, plus abordables et plus
						agréables pour tous.
					</p>
				</div>

				<div className="mt-10">
					<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
						<div className="relative">
							<dt>
								<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								</div>
								<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
									Notre histoire
								</p>
							</dt>
							<dd className="mt-2 ml-16 text-base text-gray-500">
								Mon Application a été fondée en 2010 par un groupe d'amis
								passionnés de voyage et de technologie. Tout a commencé lors
								d'un road trip mémorable où ils ont réalisé à quel point il
								était difficile de trouver des covoiturages fiables et
								abordables. Ils ont décidé de créer une plateforme qui rendrait
								le covoiturage accessible à tous, partout dans le monde.
								<br />
								<br />
								Depuis lors, nous avons connu une croissance exceptionnelle.
								Nous avons commencé avec une poignée d'utilisateurs à Paris, et
								maintenant nous servons des millions de personnes dans plus de
								50 pays. Malgré cette croissance, notre mission est restée la
								même : rendre les voyages meilleurs pour tous.
							</dd>
						</div>

						<div className="relative">
							<dt>
								<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
									<svg
										className="h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
									Nos valeurs
								</p>
							</dt>
							<dd className="mt-2 ml-16 text-base text-gray-500">
								Chez Mon Application, nos valeurs guident tout ce que nous
								faisons. Nous croyons en :
								<br />
								<br />
								<strong>La simplicité</strong> : Nous rendons le covoiturage
								facile et accessible à tous. Notre application est intuitive et
								conviviale, pour que vous puissiez trouver un trajet en quelques
								clics.
								<br />
								<br />
								<strong>La sécurité</strong> : Votre sécurité est notre priorité
								absolue. Nous vérifions tous nos conducteurs et véhicules, et
								notre système de notation et de commentaires vous aide à choisir
								des covoiturages de confiance.
								<br />
								<br />
								<strong>Le service</strong> : Nous sommes dévoués à vous fournir
								le meilleur service possible. Notre équipe de support client est
								toujours là pour vous aider, 24h/24 et 7j/7.
								<br />
								<br />
								<strong>La communauté</strong> : Chez Mon Application, vous
								faites partie d'une communauté mondiale de voyageurs. Nous
								encourageons les interactions et le partage d'expériences pour
								rendre chaque trajet unique et mémorable.
							</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
};

export default About;

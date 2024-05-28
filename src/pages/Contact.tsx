import React from "react";
import contact from "/contact.png";

const Contact: React.FC = () => {
	return (
		<div className="bg-gray-100 min-h-screen py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
						Nous contacter
					</h2>
					<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
						Nous sommes là pour vous 💪
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
						Vous avez une question, une suggestion ou simplement envie de dire
						bonjour ? N'hésitez pas à nous contacter. Notre équipe amicale et
						dévouée est toujours ravie d'avoir de vos nouvelles !
					</p>
				</div>

				<div className="mt-10 flex justify-center">
					<img
						src={contact}
						alt="Support client"
						className="w-full sm:w-auto"
					/>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
							<svg className="h-6 w-6 mr-2"></svg>
							Support client
						</h3>
						<dl className="mt-2 text-base text-gray-500">
							<div className="flex items-center">
								<dt className="sr-only">Email</dt>
								<dd className="flex items-center">
									<span className="mr-2">📧</span>
									<a
										href="mailto:support@GoCar.com"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										support@gocar.com
									</a>
								</dd>
							</div>
							<div className="mt-1 flex items-center">
								<dt className="sr-only">Téléphone</dt>
								<dd className="flex items-center">
									<span className="mr-2">📞</span>
									<a
										href="tel:+33123456789"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										+33 1 23 45 67 89
									</a>
								</dd>
							</div>
						</dl>
					</div>

					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
							<svg className="h-6 w-6 mr-2"></svg>
							Partenariats
						</h3>
						<dl className="mt-2 text-base text-gray-500">
							<div className="flex items-center">
								<dt className="sr-only">Email</dt>
								<dd className="flex items-center">
									<span className="mr-2">📧</span>
									<a
										href="mailto:partenariats@GoCar.com"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										partenariats@gocar.com
									</a>
								</dd>
							</div>
							<div className="mt-1 flex items-center">
								<dt className="sr-only">Téléphone</dt>
								<dd className="flex items-center">
									<span className="mr-2">📞</span>
									<a
										href="tel:+33987654321"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										+33 9 87 65 43 21
									</a>
								</dd>
							</div>
						</dl>
					</div>

					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
							<svg className="h-6 w-6 mr-2"></svg>
							Presse
						</h3>
						<dl className="mt-2 text-base text-gray-500">
							<div className="flex items-center">
								<dt className="sr-only">Email</dt>
								<dd className="flex items-center">
									<span className="mr-2">📧</span>
									<a
										href="mailto:presse@GoCar.com"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										presse@gocar.com
									</a>
								</dd>
							</div>
							<div className="mt-1 flex items-center">
								<dt className="sr-only">Téléphone</dt>
								<dd className="flex items-center">
									<span className="mr-2">📞</span>
									<a
										href="tel:+33198765432"
										className="transition duration-300 ease-in-out hover:text-blue-500"
									>
										+33 1 98 76 54 32
									</a>
								</dd>
							</div>
						</dl>
					</div>

					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
							<svg className="h-6 w-6 mr-2"></svg>
							Siège social
						</h3>
						<address className="mt-2 not-italic text-base text-gray-500">
							123 Rue des Développeurs
							<br />
							75000 Paris, France
						</address>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;

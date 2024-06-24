import React, { useContext, useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MotionDiv from "./components/MotionDiv";
import Management from "./components/profile/Management";
import Vehicles from "./components/profile/Vehicles";
import Home from "./pages/Home";
import Profile from "./navigation/Profile";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TripsList from "./components/TripsList";
import TripDetails from "./components/TripDetails";
import CreateTrip from "./pages/CreateTrip";
import UserTrips from "./navigation/UserTrips";

const AppRoutes: React.FC = () => {
	const location = useLocation();
	const [isAuthChecked, setIsAuthChecked] = useState(false);
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		const checkAuth = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setIsAuthChecked(true);
		};
		checkAuth();
	}, []);

	if (!isAuthChecked) {
		return null;
	}
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route
					path="/"
					element={
						<MotionDiv>
							<Home />
						</MotionDiv>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<MotionDiv>
								<Profile />
							</MotionDiv>
						</ProtectedRoute>
					}
				>
					<Route index element={<Management />} />
					<Route path="vehicles/*" element={<Vehicles />} />
					<Route path="trips" element={<UserTrips />} />
				</Route>
				<Route
					path="/trips"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<MotionDiv>
								<TripsList />
							</MotionDiv>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/trips/:id"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<MotionDiv>
								<TripDetails />
							</MotionDiv>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/create-trip"
					element={
						<ProtectedRoute isAuthenticated={isAuthenticated}>
							<MotionDiv>
								<CreateTrip />
							</MotionDiv>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={
						!isAuthenticated ? (
							<MotionDiv>
								<Login />
							</MotionDiv>
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
				<Route
					path="/about"
					element={
						<MotionDiv>
							<About />
						</MotionDiv>
					}
				/>
				<Route
					path="/contact"
					element={
						<MotionDiv>
							<Contact />
						</MotionDiv>
					}
				/>
				<Route
					path="*"
					element={
						<MotionDiv>
							<NotFound />
						</MotionDiv>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
};

const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<AppRoutes />
				<Footer />
			</Router>
		</AuthProvider>
	);
};

export default App;

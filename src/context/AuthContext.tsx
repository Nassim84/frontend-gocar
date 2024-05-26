// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	login: () => {},
	logout: () => {},
});

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Vérifiez le jeton dans le localStorage lors du montage du composant
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (token: string) => {
		// Stockez le jeton dans le localStorage ou un autre stockage sécurisé
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		// Supprimez le jeton du localStorage ou d'un autre stockage sécurisé
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

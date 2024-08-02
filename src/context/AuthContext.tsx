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
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	const login = (token: string) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("token");

		if ("caches" in window) {
			caches.keys().then((names) => {
				names.forEach((name) => {
					caches.delete(name);
				});
			});
		}

		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

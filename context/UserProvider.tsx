"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { getUser } from "@/axios/instance";
import { User } from "@/types";



interface UserContextType {
	userInfo: User | null;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
}

const defaultContextValue: UserContextType = {
	userInfo: null,
	isLoading: false,
	isError: false,
	error: null,
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { auth }: any = useAuth();

	const {
		data: userInfoResponse,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryFn: () => getUser(auth?.userId),
		queryKey: ["userInfo", auth?.userId],
		enabled: !!auth?.userId,
	});

	const userInfo = userInfoResponse ?? null;

	if (isLoading) {
		return (
			<UserContext.Provider
				value={{
					userInfo: null,
					isLoading: true,
					isError: false,
					error: null,
				}}
			>
				{children}
			</UserContext.Provider>
		);
	}

	return (
		<UserContext.Provider value={{ userInfo, isLoading, isError, error }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("UserContext must be used within a UserProvider");
	}
	return context;
};

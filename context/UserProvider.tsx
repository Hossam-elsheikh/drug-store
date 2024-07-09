'use client'
import { createContext, ReactNode } from "react";
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { getUser } from '@/axios/instance';

interface UserInfo {
    id: string;
    name: string;
    email: string;
    mobile: string;
    createdAt: string;
    updatedAt: string;
}

interface UserContextType {
    userInfo: UserInfo | null;
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
    const { auth }:any = useAuth();

    const { data: userInfoResponse, isLoading, isError, error } = useQuery({
        queryFn: () => getUser(auth.userId),
        queryKey: ['userInfo'],
        enabled: !!auth.userId,
    });

    const userInfo = userInfoResponse?.data ?? null;


    return (
        <UserContext.Provider value={{ userInfo, isLoading, isError, error }}>
            {children}
        </UserContext.Provider>
    );
};

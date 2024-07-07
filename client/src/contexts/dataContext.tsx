// DataContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Course } from '../types/courseType';
import { User } from '../types/userType';
import { loginUser, validateUser } from '../apis/userApi';
import { Console, error } from 'console';
import { useNavigate } from 'react-router-dom';

export interface DataContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    login: (eMail: string, password: string) => void;
    logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataContextProviderProps {
    children: ReactNode;
}

export const DataContextProvider: React.FC<DataContextProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /*-------------------- CREATE THIS FUNCTION LATER ----------------------*/
    // const generateUserData: User = (data: any) => {
    //     return {
    //         userId: data._id,
    //         eMail: data.eMail,
    //         safePercentage: data.safePercentage,
    //         courses: data.courses
    //     } as User;
    // };

    const login = async (eMail: string, password: string) => {
        await loginUser(eMail, password)
            .then((responseData) => {
                localStorage.setItem('token', responseData.token);
                console.log('setting into local storage')

                const userData: User = {
                    userId: responseData._id,
                    eMail: responseData.eMail,
                    safePercentage: responseData.safePercentage,
                    courses: responseData.courses
                } as User;

                setUser(userData);
                
                setAuthToken(responseData.token);
            })
            .catch((error) => {
                console.error('Error loggin in user:', error.response ? error.response.data : error.message);
            });
    };

    const logout = () => {
        localStorage.clear();
        setAuthToken(null);
        setUser(null);
        navigate('/');
    };

    // useEffect(() => {
    //     checkLocalStorage();
    // }, []);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedToken: string = localStorage.getItem('token') || '';

            if(!storedToken) 
                navigate('/login');
            
            setAuthToken(storedToken);
        };

        const loadUserData = async () => {
            await validateUser(authToken || '')
                .then((response) => {
                    console.log('User validated successfully');

                    const userData: User = {
                        userId: response._id,
                        eMail: response.eMail,
                        safePercentage: response.safePercentage,
                        courses: response.courses
                    } as User;
                    
                    console.log('a')

                    setUser(userData);        
                    setIsLoading(false);

                    console.log('b')

                    navigate('/');

                    console.log('c')
                })
                .catch((error) => {
                    logout();
                    console.error('Error validating user:', error.response ? error.response.data : error.message);
                });
        };
    

        if (authToken) {
            loadUserData();
        } else {
            checkLocalStorage();
        }

    }, [authToken]);

    return (
        <DataContext.Provider
            value={{
                user,
                setUser,
                authToken,
                setAuthToken,
                isLoading,
                setIsLoading,
                login,
                logout
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext) as DataContextType;
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
};

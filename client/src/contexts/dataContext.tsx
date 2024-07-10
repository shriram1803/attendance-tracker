import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/userType';
import { loginUser, validateUser, registerUser } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';
import { addCourse, removeCourse } from '../apis/courseApi';

export interface DataContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    register: (eMail: string, password: string, safePercentage: string) => void;
    login: (eMail: string, password: string) => void;
    logout: () => void;
    add: (courseCode: string, courseName: string) => void;
    remove: (courseId: string) => void;
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
    const handleLoginSuccess = (user: any) => {
        localStorage.setItem('token', user.token);

        const userData: User = {
            userId: user._id,
            eMail: user.eMail,
            safePercentage: user.safePercentage,
            courses: user.courses
        } as User;

        setUser(userData);

        setAuthToken(user.token);

        setIsLoading(false);

        navigate('/');
    };

    const login = (eMail: string, password: string) => {
        loginUser(eMail, password)
            .then((responseData) => {
                handleLoginSuccess(responseData);
            })
            .catch((error) => {
                console.error('Error loggin in user:', error.response ? error.response.data : error.message);
            });
    };

    const register = (email: string, password: string, safePercentage: string) => {
        registerUser(email, password, Number(safePercentage))
            .then((responseData) => {
                handleLoginSuccess(responseData);
            })
            .catch((error) => {
                console.error('Error registering user:', error.response ? error.response.data : error.message);
            });
    };

    const logout = () => {
        localStorage.clear();
        setAuthToken(null);
        setUser(null);
        navigate('/');
    };

    const add = (courseCode: string, courseName: string) => {
        addCourse(courseCode, courseName, authToken || '')
            .then((responseData) => {
                if (user) {
                    setUser({
                        ...user,
                        courses: [...user.courses, responseData]
                    } as User);
                }
            })
            .catch((error) => {
                console.error('Error registering user:', error.response ? error.response.data : error.message);
            });
    };

    const remove = (courseId: string) => {
        setIsLoading(true);
        removeCourse(courseId, authToken || '')
            .then((responseData) => {
                if (user) {
                    const updatedUser: User = {
                        ...user,
                        courses: user.courses.filter(course => course.courseId !== courseId)
                    } as User;

                    setUser(updatedUser);
                    setIsLoading(true);
                }
            })
            .catch((error) => {
                console.error('Error registering user:', error.response ? error.response.data : error.message);
            });
    };

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedToken: string = localStorage.getItem('token') || '';

            if (!storedToken)
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

                    setUser(userData);
                    setIsLoading(false);
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
                register,
                login,
                logout,
                add,
                remove
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextType => {
    const context: DataContextType = useContext(DataContext) as DataContextType;
    if (context === undefined) {
        throw new Error('useDataContext must be used within a DataContextProvider');
    }
    return context;
};

// src/contexts/DataContext.js
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/userType';
import { loginUser, validateUser, registerUser, updateUser } from '../apis/userApi';
import { addCourse, removeCourse, updateCourse } from '../apis/courseApi';
import { Course } from '../types/courseType';
import { errorToast, successToast } from '../utils/toaster';

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
    edit: (updatedCourse: Course) => void;
    remove: (courseId: string) => void;
    updateProfile: (user: User) => void;
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
                successToast('Logged In');
            })
            .catch((error) => {
                console.error('Error logging in user:', error.response ? error.response.data : error.message);
                errorToast('Error logging in');
            });
    };

    const register = (email: string, password: string, safePercentage: string) => {
        registerUser(email, password, Number(safePercentage))
            .then((responseData) => {
                handleLoginSuccess(responseData);
                successToast('Registered Successfully');
            })
            .catch((error) => {
                console.error('Error registering user:', error.response ? error.response.data : error.message);
                errorToast('Error registering');
            });
    };

    const logout = () => {
        localStorage.clear();
        setAuthToken(null);
        setUser(null);
        navigate('/');
        successToast('Logged Out');
    };

    const add = (courseCode: string, courseName: string) => {
        setIsLoading(true);
        addCourse(courseCode, courseName, authToken || '')
            .then((responseData) => {
                if (user) {
                    setUser({
                        ...user,
                        courses: [...user.courses, responseData]
                    } as User);
                    successToast('Course Added');
                }
            })
            .catch((error) => {
                console.error('Error adding course:', error.response ? error.response.data : error.message);
                errorToast('Error adding course');
            })
            .finally(() => setIsLoading(false));
    };

    const edit = (updatedCourse: Course) => {
        updateCourse(
            updatedCourse._id,
            updatedCourse.courseCode,
            updatedCourse.courseName,
            updatedCourse.attendedHours,
            updatedCourse.missedHours,
            updatedCourse.unknownHours,
            authToken || ''
        ).then((responseData) => {
            if (user) {
                const updatedUser: User = {
                    ...user,
                    courses: user.courses.map(course => course._id !== updatedCourse._id ? course : updatedCourse)
                } as User;
                setUser(updatedUser);
                navigate('/');
                // successToast('Course Updated');
            }
        })
            .catch((error) => {
                console.error('Error updating course:', error.response ? error.response.data : error.message);
                errorToast('Error updating course');
            });
    };

    const remove = (courseId: string) => {
        setIsLoading(true);
        removeCourse(courseId, authToken || '')
            .then((responseData) => {
                if (user) {
                    const updatedUser: User = {
                        ...user,
                        courses: user.courses.filter(course => course._id !== courseId)
                    } as User;
                    setUser(updatedUser);
                    successToast('Course Removed');
                }
            })
            .catch((error) => {
                console.error('Error removing course:', error.response ? error.response.data : error.message);
                errorToast('Error removing course');
            })
            .finally(() => setIsLoading(false));
    };

    const updateProfile = (profile: User) => {        
        setIsLoading(true);
        updateUser(profile.eMail, profile?.password || '', profile.safePercentage, authToken || '')
            .then((responseData) => {
                if (user) {
                    const updatedUser: User = {
                        userId: user.userId,
                        eMail: profile.eMail,
                        safePercentage: profile.safePercentage,
                        courses: user.courses
                    } as User;
                    setUser(updatedUser);
                    successToast('Profile Updated');
                }
            })
            .catch((error) => {
                console.error('Error updating profile:', error.response ? error.response.data : error.message);
                errorToast('Error updating profile');
            })
            .finally(() => setIsLoading(false));
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
                .then((responseData) => {
                    console.log('User validated successfully');

                    const userData: User = {
                        userId: responseData._id,
                        eMail: responseData.eMail,
                        safePercentage: responseData.safePercentage,
                        courses: responseData.courses
                    } as User;

                    setUser(userData);
                })
                .catch((error) => {
                    console.error('Error validating user:', error.response ? error.response.data : error.message);
                    errorToast('Error validating user');
                })
                .finally(() => setIsLoading(false));
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
                edit,
                remove,
                updateProfile
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

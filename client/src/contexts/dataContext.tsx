import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/userType';
import { loginUser, validateUser, registerUser } from '../apis/userApi';
import { useNavigate } from 'react-router-dom';
import { addCourse, decrementAttendance, incrementAttendance, removeCourse, updateCourse } from '../apis/courseApi';
import { AttendaceFieldType, Course } from '../types/courseType';

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
    increment: (courseId: string, targetField: AttendaceFieldType) => void;
    decrement: (courseId: string, targetField: AttendaceFieldType) => void;
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

    const handleAttendanceUpdation = (user: User, courseId: string, targetField: AttendaceFieldType, value: number) => {
        if (targetField) {
            const updatedUser: User = {
                ...user,
                courses: user.courses.map((course) =>
                    course._id === courseId
                        ? { ...course, [targetField]: course[targetField] + value }
                        : course
                ),
            };
            
            setUser(updatedUser);
        }
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
        setIsLoading(true);
        addCourse(courseCode, courseName, authToken || '')
            .then((responseData) => {
                if (user) {
                    setUser({
                        ...user,
                        courses: [...user.courses, responseData]
                    } as User);
                    alert('Added Course!!');
                }
            })
            .catch((error) => {
                console.error('Error adding course:', error.response ? error.response.data : error.message);
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
                }
            })
            .catch((error) => {
                console.error('Error removing user:', error.response ? error.response.data : error.message);
            })
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
                }
            })
            .catch((error) => {
                console.error('Error removing user:', error.response ? error.response.data : error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const increment = (courseId: string, targetField: AttendaceFieldType) => {
        incrementAttendance(courseId, targetField, authToken || '')
            .then((responseData) => {
                if (!user || !targetField) {
                    throw new Error('Missing required data: ' + (user ? '' : 'user, ') + (targetField ? '' : 'targetField'));
                }
                handleAttendanceUpdation(user, courseId, targetField, 1);
            })
            .catch((error) => {
                console.error('Error incrementin:', error.response ? error.response.data : error.message);
            })
    };

    const decrement = (courseId: string, targetField: AttendaceFieldType) => {
        decrementAttendance(courseId, targetField, authToken || '')
            .then((responseData) => {
                if (!user || !targetField) {
                    throw new Error('Missing required data: ' + (user ? '' : 'user, ') + (targetField ? '' : 'targetField'));
                }
                handleAttendanceUpdation(user, courseId, targetField, -1);
            })
            .catch((error) => {
                console.error('Error decrementing:', error.response ? error.response.data : error.message);
            })
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
                })
                .catch((error) => {
                    // logout();
                    console.error('Error validating user:', error.response ? error.response.data : error.message);
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
                increment,
                decrement
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

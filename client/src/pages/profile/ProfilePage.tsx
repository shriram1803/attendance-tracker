import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/dataContext";
import { User } from "../../types/userType";
import Loading from "../../components/loading/Loading";


const ProfilePage = () => {
    const { user, updateProfile, isLoading } = useDataContext();

    const [currentUser, setCurrentUser] = useState<User | null>(user);
    const [safePercentage, setSafePercentage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        setCurrentUser({
            ...currentUser,
            [name]: value
        } as User);
    };

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(currentUser?.eMail || '')) {
            setError('Invalid email address');
            return;
        }
        
        setError('');
        if (currentUser) 
            updateProfile({ ...currentUser, safePercentage: Number(safePercentage) });
    };

    const handleReset = () => {
        if (user)
            setCurrentUser({ ...user, password: '' });
    };

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
            setSafePercentage(String(user?.safePercentage || 0));
        }
    }, [user]);

    if (isLoading || !user)
        return <Loading />;

    return (
        <div className="container mx-auto p-4">
            <div className="text-2xl font-semibold text-gray-800 mb-3">Profile</div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col md:flex-row md:items-center">
                    <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="eMail">
                        E-Mail
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="eMail"
                        name="eMail"
                        value={currentUser?.eMail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4 flex flex-col md:flex-row md:items-center">
                    <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        id="password"
                        name="password"
                        value={currentUser?.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4 flex flex-col md:flex-row md:items-center">
                    <label className="block text-gray-600 w-48 text-md font-bold mb-2" htmlFor="safePercentage">
                        Safe Percentage
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="safePercentage"
                        name="safePercentage"
                        value={safePercentage}
                        onChange={(e) => {
                            if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100)
                                setSafePercentage(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="mb-4 flex flex-col md:flex-row md:items-center">
                    <button
                        type="button"
                        className="cursor-pointer mt-3 bg-gray-600 hover:bg-gray-500 text-white py-2 w-full md:w-40 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer mt-3 md:ml-3 border-2 border-gray-600 bg-gray-100 hover:bg-gray-200 text-gray-600 py-2 w-full md:w-40 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
                {error && <div className="text-red-500">{error}</div>}
            </form>
        </div>
    )
};

export default ProfilePage;

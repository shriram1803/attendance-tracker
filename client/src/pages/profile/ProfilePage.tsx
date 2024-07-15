import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/dataContext";
import { User } from "../../types/userType";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";


const ProfilePage = () => {
    const { user } = useDataContext();

    const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User>(user as User);
    const [safePercentage, setSafePercentage] = useState<string>(String(user?.safePercentage));
    const [error, setError] = useState<string>('');


    const isNumber = (value: string): boolean => {
        return !isNaN(parseFloat(value));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser({
            ...user,
            eMail: e.target.value
        } as User);
        setEnableSubmit(true);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentUser({
            ...user,
            password: e.target.value
        } as User);
        setEnableSubmit(true);
    };

    const handleSafePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if ((Number(e.target.value) >= 0 && Number(e.target.value) <= 100))
            setCurrentUser({
                ...user,
                safePercentage: parseInt(e.target.value)
            } as User);
    };

    const getValidPercentage = (percentage: string): number => {
        if(0 <= Number(percentage) && Number(percentage) <= 100) {
            return Number(percentage);
        }

        return user?.safePercentage || 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string | number = name === 'safePercentage' ? getValidPercentage(e.target.value) : e.target.value;
        setCurrentUser({
            ...user,
            name: value
        } as User);
        setEnableSubmit(true);
    };

    const handleSubmit = () => {

    };

    const handleReset = () => {
        if (user)
            setCurrentUser(user);
        setEnableSubmit(false);
    };

    if (!user)
        return <></>;

    return (
        <div className="flex flex-col">
            <div>
                E-Mail: <input type="text" name="eMail" value={currentUser.eMail} onChange={handleEmailChange} required />
            </div>
            <div>
                Password: <input type="password" name="password" value={currentUser.password} onChange={handlePasswordChange} />
            </div>
            <div>
                Safe Percentage: <input type="number" name="safePercentage" value={currentUser.safePercentage} onChange={handleSafePercentageChange} required />
            </div>
            <div>
                <button type="submit" disabled={!enableSubmit}>
                    Submit
                </button>
                <button type="submit" disabled={!enableSubmit} onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div className="text-red-500">
                {error}
            </div>
        </div>
    )
};

export default ProfilePage;

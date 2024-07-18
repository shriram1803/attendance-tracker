import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/dataContext";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useDataContext();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [safePercentage, setSafePercentage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleRegisterSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email address');
            return;
        }
        if (!email || !password || !safePercentage) {
            setError('All fields are required');
            return;
        }
        setError('');
        register(email, password, safePercentage);
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="py-4 px-8 rounded border-2 border-gray-300 shadow-lg h-1/2 flex items-center">
                <div className="flex flex-col w-56">
                    <input
                        type='email'
                        value={email}
                        placeholder="E-Mail"
                        className="border-2 focus:outline-gray-400 text-gray-600 border-gray-300 p-2 rounded my-4"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        value={password}
                        placeholder="Password"
                        className="border-2 focus:outline-gray-400 text-gray-600 border-gray-300 p-2 rounded mb-6"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type='number'
                        value={safePercentage}
                        placeholder="Required Percentage"
                        className="border-2 focus:outline-gray-400 text-gray-600 border-gray-300 p-2 rounded mb-6"
                        onChange={(e) => {
                            if (Number(e.target.value) >= 0 && Number(e.target.value) <= 100)
                                setSafePercentage(e.target.value);
                        }}
                        required
                    />
                    <button
                        className="bg-gray-600 py-2 text-white rounded hover:bg-gray-500"
                        onClick={handleRegisterSubmit}
                    >
                        Register
                    </button>
                    <span className="text-xs text-center my-2">
                        Have an account? 
                        <a className="cursor-pointer hover:text-cyan-600 hover:underline" onClick={() => navigate('/login')}>
                            Login
                        </a>
                    </span>
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            </div>
        </div>
    );
};

export default Register;

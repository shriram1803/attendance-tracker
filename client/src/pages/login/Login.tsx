import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/dataContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const Login = () => {
    const navigate = useNavigate();

    const { authToken, login, isLoading } = useDataContext();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginSubmit = () => {
        login(email, password);
    };

    useEffect(() => {
        if(authToken)
            navigate('/');
    }, [authToken]);

    return (
        <div className="flex justify-center items-center h-full">
            <div className="py-4 px-8 rounded border-2 border-gray-300 shadow-lg h-1/3 flex items-center">
                <div className="flex flex-col w-56">
                    <input
                        type='text'
                        value={email}
                        placeholder=" E - Mail"
                        className="border-2 focus:outline-gray-400 text-gray-600 border-gray-300 p-2 rounded my-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input  
                        type='password'
                        value={password}
                        placeholder=" Password"
                        className="border-2 focus:outline-gray-400 text-gray-600 border-gray-300 p-2 rounded mb-6"
                        onChange={(e) => setPassword(e.target.value)}
                    />  
                    <button
                        className="bg-gray-600 py-2 text-white rounded hover:bg-gray-500"
                        onClick={handleLoginSubmit}
                    >
                        Login
                    </button>

                    <span className="text-xs text-center my-2">New User? <a className=" cursor-pointer hover:text-cyan-600 hover:underline" onClick={() => navigate('/register')}> Register </a> </span>

                </div>
            </div>
        </div>
    );
};

export default Login;
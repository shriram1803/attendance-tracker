import { useState } from "react";
import { useDataContext } from "../../contexts/dataContext";

const Login = () => {
    const { login } = useDataContext();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginSubmit = () => {
        login(email, password);
    };

    return (
        <>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLoginSubmit}>
                Login
            </button>
        </>
    );
};

export default Login;
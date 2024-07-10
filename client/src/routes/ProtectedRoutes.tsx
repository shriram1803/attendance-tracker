import { Navigate, Outlet } from "react-router-dom";
import Main from "../pages/Main";

const ProtectedRoutes: React.FC<{}> = ({ }) => {
    const token: string = localStorage.getItem('token') || '';
    return (
        token ? <Main /> : <Navigate to='/login' />
    );

};

export default ProtectedRoutes;
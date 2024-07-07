import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes: React.FC<{}> = ({  }) => {
    const token: string = localStorage.getItem('token') || '';
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    );

};

export default ProtectedRoutes;
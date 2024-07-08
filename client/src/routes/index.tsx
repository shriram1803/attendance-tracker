import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "../contexts/dataContext";
import ProtectedRoutes from "./ProtectedRoutes";
import routes from "./Routes";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const RouterMain = () => {

    return (
        <BrowserRouter>
            <DataContextProvider>
                <Routes>
                    <Route element={<ProtectedRoutes />} >
                        {routes}
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </DataContextProvider>
        </BrowserRouter>

    );
};


export default RouterMain;
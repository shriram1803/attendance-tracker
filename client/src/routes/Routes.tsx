import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Login from "../pages/home/login/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { DataContextProvider } from "../contexts/dataContext";

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <DataContextProvider>
                <Routes>
                    <Route element={<ProtectedRoutes />} >
                        <Route index path="/" element={<HomePage />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </DataContextProvider>
        </BrowserRouter>

    );
};


export default AppRoutes;
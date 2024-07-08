import { Outlet } from "react-router-dom";
import TopBar from "../components/topbar/TopBar";

const Main = () => {

    return (
        <>
            <TopBar />
            <Outlet />
        </>
    );
};

export default Main;
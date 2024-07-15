import { Outlet } from "react-router-dom";
import TopBar from "../components/topbar/TopBar";

const Main = () => {

    return (
        <div className="h-screen flex flex-col">
            <TopBar />   
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;
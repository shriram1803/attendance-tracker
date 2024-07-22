import { Outlet } from "react-router-dom";
import TopBar from "../components/topbar/TopBar";
import BottomBar from "../components/bottombar/BottomBar";

const Main = () => {

    return (
        <div className="h-screen flex flex-col">
            <TopBar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
            <div className="fixed bottom-0 w-full">
                <BottomBar />
            </div>
        </div>
    );
};

export default Main;
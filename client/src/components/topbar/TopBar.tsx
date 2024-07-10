import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/dataContext";

const TopBar = () => {
    const navigate = useNavigate();
    const { logout } = useDataContext();

    return (
        // <div className="flex bg-black h-14">
        //     <div className="">
        //         <h1 className="text-cyan-50">
        //             Attendance Tracker 101
        //         </h1>
        //     </div>
        //     <div className="flex justify-end text-white w-full">
        //         {/* <button className="text-cyan-50" value={'logout'} onClick={logout} >
        //             logout
        //         </button> */}
        //         {'*'}
        //     </div>
        // </div>

        <div className="flex items-center bg-black h-14 justify-between text-white px-4">
            <div className="text-lg cursor-pointer" onClick={() => navigate('/')}>
                Attendance Tracker
            </div>
            <div>
                <button className="text-cyan-50" value={'logout'} onClick={logout} >
                    logout
                </button>
            </div>

        </div>
    );
};

export default TopBar;
import { useDataContext } from "../../contexts/dataContext";

const TopBar = () => {
    const { logout } = useDataContext();

    return (
        <div className="flex flex-row grid-cols-2 bg-black">
            <div className="col-span-1">
                <h1 className="text-cyan-50">
                    Hello
                </h1>
            </div>
            <div className="col-span-1">
                <button className="text-cyan-50" value={'logout'} onClick={logout} >
                    logout
                </button>
            </div>
        </div>
    );
};

export default TopBar;
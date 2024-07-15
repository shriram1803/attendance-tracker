import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/dataContext";

const TopBar = () => {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { logout } = useDataContext();

    const [showDropDown, setDropDown] = useState<boolean>(false);

    const closeOpenDropDown = (e: MouseEvent) => {
        if (showDropDown && ref.current && !ref.current.contains(e.target as Node)) {
            setDropDown(false);
        }
    };

    document.addEventListener('mousedown', closeOpenDropDown);

    return (
        <div ref={ref} className="flex items-center bg-black h-14 justify-between text-white pl-4" onAuxClick={() => setDropDown(!showDropDown)}>
            <div className="text-lg cursor-pointer" onClick={() => navigate('/')}>
                Attendance Tracker
            </div>
            <div>
                <button className="text-cyan-50 mr-0 h-12 w-12 rounded-full hover:bg-gray-600 transition" onClick={() => setDropDown(!showDropDown)} >
                    <svg
                        className="h-8 w-8 text-white ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </button>
                <div style={{ display: showDropDown ? 'block' : 'none' }} className="z-30 absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                    <div className="py-1" role="none">
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 transition"
                            onClick={() => {
                                setDropDown(false);
                                navigate('/profile');
                            }}
                        >
                            Profile
                        </button>
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-300 transition"
                            onClick={logout}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TopBar;
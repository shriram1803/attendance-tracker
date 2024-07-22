import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/dataContext";

const BottomBar = () => {

    return (
        <div className="flex bg-black h-4 text-xs justify-center text-white text-center w-full" >       
           © Shriram Ramachandran      
        </div>
    );
};

export default BottomBar;
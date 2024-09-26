import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();
    const [currentRoute , setCurrentRoute] = useState(location.pathname.split("/"));
    
    useEffect(()=>{
        if(location.pathname.split("/") == ","){
            setCurrentRoute("Bills");
        }else if(location.pathname.split("/") == ",login"){
            setCurrentRoute("Login")
        }else{
            setCurrentRoute("Dues")
        }
       
    },[location])
    return ( 
        <header className="flex flex-col full    "> 
            <h1 className="text-5xl self-center font-extrabold "> {currentRoute} </h1>
            <h4 className="text-2xl self-center mt-2">Pay Babay</h4>
        </header>
    );
}

export default Header;
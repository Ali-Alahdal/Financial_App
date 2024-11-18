import {  useRef, useState , useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import BillForm from "../parts/BillForm";
import { useNavigate } from "react-router-dom";
function Footer() {


    const [open , setOpen] = useState(false);
    const [loggedIn , setLoggedIn] = useState(false);
    const navigate  = useNavigate();

    
    useEffect(()=>{
       
        if(!localStorage.getItem("username")){
            setLoggedIn(false);
            
        }else{
            setLoggedIn(true);
        }
    },[navigate]);
  
    return ( 
        <>
    
        {loggedIn ? 
            <> 
            <footer className="w-screen h-20   px-6  fake-footer    "></footer>
            <footer className="w-screen fixed h-20 flex justify-between items-center px-6 bottom-0 border-top border-t-2 border-black bg-[var(--bg)]  ">
                
                
                <NavLink className={({ isActive }) => isActive ? " bg-gray-100 px-5 py-3    " : "px-5 py-3 " } to={"/"}>
                    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-11">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                </NavLink>
                
              
                <div onClick={() => setOpen(true)} onPointerUp={() => setOpen(false)} className="px-5 py-3 active:bg-gray-100">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>

            
                <NavLink className={({ isActive }) => isActive ? " bg-gray-100 px-5 py-3    " : "px-5 py-3 " }to={"/history"}> 
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </NavLink>
                
        
                <BillForm refs={open} />

            </footer>  </>  : null}

          
        </>
     );
}

export default Footer;
import { useEffect  } from "react";
import Bill from "../parts/Bill";
import { useNavigate } from "react-router-dom";
function Bills() {

    // const navigate  = useNavigate();
    // useEffect(()=>{
       
    //     if(!localStorage.getItem("username")){
    //         navigate("/login")
            
    //     }
    // },[navigate]);
    return ( 
        <main>
                <Bill />
                <Bill />
                <Bill />
             
        </main>
     );
}

export default Bills;
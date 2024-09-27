import Due from "../parts/Due";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Dues() {

    const members = [{username : "Husam" , totalDues : 12500}, {username : "Abshir" , totalDues : 1200},{username : "Osman" , totalDues : 12350} ]
    
    const [dues, setDues] = useState(members);


    const navigate  = useNavigate();
    useEffect(()=>{
       
        if(!localStorage.getItem("username")){
            navigate("/login")
            
        }
    },[navigate]);


    useEffect(() =>{
        const fetchDues = async () => {
            try {
                const response = await axios.get(`https://paybaby.somee.com/api/History/History?name=${localStorage.getItem("username")}`);

                if(response.statusText != "OK") {
                    throw new Error("Something went wrong, " + response );
                }else{
                    setDues(response.data);
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchDues();
     },[])
    
    return ( 
        <main className="mb-2   ">
            {dues.map((mebmer , index) =>{
                return(
                    <Due key={index} owner={mebmer.owner} totalDues={mebmer.total} />
                )
            })}
          
         
        </main>
     );
}

export default Dues;
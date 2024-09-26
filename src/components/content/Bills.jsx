import { useEffect, useState  } from "react";
import Bill from "../parts/Bill";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Bills() {

    
    const Bills = [{id : 1 , owner : "Husam" , total : 1000} , {id : 2 ,owner : "Abshir" , total : 1000}  ,{id : 3 ,owner : "Abdulah" , total : 1000}  ];
    const [bills , setBills] = useState(Bills);
    const navigate  = useNavigate();


    useEffect(()=>{
       
        if(!localStorage.getItem("username")){
            navigate("/login");
            
        }
    },[navigate]);



    useEffect(() =>{
       const fetchBills = async () =>{
    
        try {
          
            const response = await axios.get(`/${localStorage.getItem("username")}`);
            
            if (!response.ok) {
                throw new Error("Something went wrong, " + response );
            }else{
                setBills(response.data);
            }

        }catch (error) {
            console.log(error);
        }
       } 

       fetchBills();
    },[]);
    return ( 
        <main className="mb-2">
                {bills.map((bill, index) =>{
                    return(
                        <Bill key={bill.id} id={bill.id} owner={bill.owner} total={bill.total} />
                    )
                })}
               
              
        </main>
     );
}

export default Bills;
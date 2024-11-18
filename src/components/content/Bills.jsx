import { useEffect, useState  } from "react";
import Bill from "../parts/Bill";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Bills() {

    
   
    const [bills , setBills] = useState([]);
    const navigate  = useNavigate();


    const [refetch, setRefetch] = useState(false);

    useEffect(()=>{
       
        if(!localStorage.getItem("username")){
            navigate("/login");
            
        }
    },[navigate]);


    useEffect(() =>{
       const fetchBills = async () =>{
        try {
    
            const response = await axios.get(`https://paybaby.somee.com/api/bill/viewMyBills?name=${localStorage.getItem("username")}`);
    
            
            if (response.status != 200) {
                throw new Error("Something went wrong, " + response );
            }else{
                setBills(response.data);
            }

        }catch (error) {
        
        }
       } 

       fetchBills();
    },[refetch,navigate]);


 

  
    return ( 
        <main className="mb-2">
                {bills.length > 0 ? bills.map((bill, index) =>{
                    return(
                        <Bill key={bill.id} id={bill.id} owner={bill.owner} total={bill.total} participants={bill.participants} 
                        description={bill.description ? bill.description : null}
                         refetch={{v : refetch , s : setRefetch }} date={bill.date} />
                    )
                }) : <div className="text-center text-red-600 mt-5"> There are No Bills Recently Added </div>}
              
              
        </main>
     );
}

export default Bills;
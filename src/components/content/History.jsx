import Due from "../parts/Due";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Bill from "../parts/Bill";


function History() {

    
    const [myBills, setMyBills] = useState([]);
    const [myHistoryBills, setMyHistoryBills] = useState([]);

    const [openMyBills , setOpenMyBills] = useState(true);
    const [openMyHistory , setOpenMyHistory] = useState(false);
    const myBillsRef = useRef(null);

    

    const myHistory = useRef(null);

    const navigate  = useNavigate();
    useEffect(()=>{
       
        if(!localStorage.getItem("username")){
            navigate("/login")
            
        }
    },[navigate]);

    

    useEffect(() =>{
        const fetchMyBills = async () => {
            try {
                const response = await axios.get(`https://paybaby.somee.com/api/bill/mybills?name=${localStorage.getItem("username")}`);

                if (response.status != 200){
                    throw new Error("Something went wrong, " + response );
                }else{
                    setMyBills(response.data);
                }
            } catch (error) {
                console.log(error);
                
            }
        }

        fetchMyBills();
     },[openMyBills])

     const usename = localStorage.getItem("username")
     const [spending , setSpending] = useState({
        total : 0,
        thisMonth : 0,
        lastMonth : 0,
     
    })

     useEffect(() =>{
        spending[`total`]  = 0;
        spending[`thisMonth`]  = 0;
        spending[`lastMonth`]  = 0;
        const currentDate = new Date()
        myHistoryBills.map((bill , index) =>{ 
            
            
            
            
            bill.participants.map((participant , index) =>{

                if(participant.person == localStorage.getItem("username")){
                    spending[`total`] +=  participant.due;
                    if(bill.date.toString().split('T')[0].split("-")[1] == currentDate.getMonth()){
                        spending[`lastMonth`] +=  participant.due;
                    }
                    if(bill.date.toString().split('T')[0].split("-")[1] == currentDate.getMonth() + 1){
                        spending[`thisMonth`] +=  participant.due;
                    }
                }
              
            })
        })
        console.log(spending);
        
    },[navigate , myHistoryBills])
     
     useEffect(() =>{
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`https://paybaby.somee.com/api/history/history?name=${localStorage.getItem("username")}`);

                if (response.status != 200){
                    throw new Error("Something went wrong, " + response );
                }else{
                    setMyHistoryBills(response.data);
                }
            } catch (error) {
                
                
            }
        }

        fetchHistory();
     },[openMyHistory])


    return ( 
        <main className="mb-2   ">

            <div className="block mt-5" >
                <h1 className="text-4xl mx-5 mb-3 flex">
                    
                    My Bills
                    
                    {openMyBills ? 
                    
                    <svg  onClick={() => {myBillsRef.current.style = "display:none" ; setOpenMyBills(false)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-3 mt-1 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                     :
                     <svg onClick={() => {myBillsRef.current.style = "display:block" ; setOpenMyBills(true)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-3 mt-1 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>     
                    }
                </h1>
                
                <div ref={myBillsRef} className="">
                    {myBills.length > 0 ? myBills.map((bill , index) =>{
                        return(
                            <Bill key={bill.id} id={bill.id} owner={bill.owner} total={bill.total} participants={bill.participants} 
                            description={bill.description ? bill.description : null} date={bill.date}/>

                        )
                    }) : <div className="text-center text-red-600"> There are No Bills You Added </div>}
                </div>
                
            </div>


            <div className="block">
                <h1 className="text-4xl mx-5 my-3 flex ">
                    
                    History
                    
                    {openMyHistory ? 
                    <svg  onClick={() => {myHistory.current.style = "display:none" ; setOpenMyHistory(false)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-3 mt-1 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    :
                    <svg onClick={() => {myHistory.current.style = "display:block" ; setOpenMyHistory(true)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 ml-3 mt-1 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    
                    }
                </h1>

                <div ref={myHistory} className="hidden">
                    {myHistoryBills.length > 0 ? myHistoryBills.map((bill , index) =>{
                        return(
                            <Bill key={bill.id} id={bill.id} owner={bill.owner} total={bill.total} participants={bill.participants} description = {bill.description} date={bill.date}  />

                        )
                    }) : <div className="text-center text-red-600"> There are No Bills Related to You </div>}
                </div>
                    
                <div className="px-3 mx-5 mt-2 bg-[var(--bg2)] py-3">
                    <h1 className="text-3xl text-center mb-3">My Expenses</h1>
                    <hr className="border-2 border-black border-dashed " />
                    <div className="mt-2">
                        <p>
                            Current Month : <span className="text-red-500">-{spending.thisMonth.toString().split(".")[0]}</span> 
                        </p>
                        <p>
                            Last Month : <span className="text-red-500"> -{spending.lastMonth.toString().split(".")[0]}</span>
                        </p>
                        <p>
                            Total :  <span className="text-red-500">-{spending.total.toString().split(".")[0]}</span>
                        </p>
                    </div>
                 
                
                </div>

                <div className="mx-5 flex justify-between my-5 px-3">
                    <label className="text-2xl">Sign Out</label>
                    <input className="bg-red-500 text-white p-3 rounded-md" type="button" value="Sign Out" 
                        onClick={() =>{
                            localStorage.removeItem("username");
                            navigate("/login");
                        }}
                    />
                </div>
            </div>

            
            
        </main>
     );
}

export default History;
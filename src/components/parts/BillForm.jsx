import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function BillForm(props) {


    const navigate = useNavigate();

    const refModal = useRef(null);
    const refTotal = useRef(null);
    const refDetails = useRef(null);
    const [participants , setParticipants] = useState([]);

    const CloseModal = (e) =>{
        if(e.target == refModal.current ){
            refModal.current.style.display = "none";
        }else if(e.target.id == "cancel"){
            refModal.current.style.display = "none";
        }
    }
    
    const HandleChanges = (e)=>{
        const participant = e.target;
        if(e.target.checked && !participants.find((part) => part == participant.id) ){
            participants.push( participant.id)
           
        }else{
            setParticipants(  participants.filter((part) => part != participant.id))
        }
    }

    useEffect(()=>{
        if(props.refs){
            refModal.current.style.display = "flex";
        } 
    },[props.refs]);



    const addBill = async () => {
        
        try {
            const response = await axios.post(`https://paybaby.somee.com/api/bill/add` , {
                "owner": localStorage.getItem("username"),
                "total":parseFloat( refTotal.current.value),
                "participants": 
                    participants.map((participant)=>{
                        return  {
                            "person" :  participant
                        }
                      
                    }),
                description : refDetails.current.value
                   
                
            })
            
            if (response.status != 200){
                throw new Error("Something went wrong, " + response );

            }else{
                console.log("Added!!!");
                refModal.current.style.display = "none";
                window.location.reload();
                
            }
        } catch (error) {
            
        }
    }


    return ( 
        <div ref={refModal} className="fixed w-screen h-screen top-0 left-0 z-1 bg-black bg-opacity-50 hidden p-12  " onClick={CloseModal}  >
            <div className="bg-white m-auto w-full relative  z-4 block px-3 py-3" id="Modal" >
            

            
                <h2 className="text-4xl text-center "> New Bill</h2>

                <hr className="border-2 border-black border-dashed mt-4" />

                <div className="text-center p-3  ">
                    <label className="block" htmlFor="details">Bill Details</label>
                    <textarea ref={refDetails} className="border-2 block self-center m-auto w-full" id="details" placeholder="süt, ekmek.........."></textarea>
                </div>

                <hr className="border-2 border-black border-dashed " />

                <form className="p-3" onChange={HandleChanges} >
                    <div className="flex justify-between ">
                        <label htmlFor="ali">Ali</label>
                        <input type="checkbox"  id="ali"  />
                    </div>
                    <div className="flex justify-between ">
                        <label htmlFor="husam">Husam</label>
                        <input type="checkbox"  id="husam"  />
                    </div>
                    <div className="flex justify-between ">
                        <label htmlFor="abdullah">Abdullah</label>
                        <input type="checkbox" id="abdullah"  />
                    </div>
                    <div className="flex justify-between ">
                        <label htmlFor="osman">Osman</label>
                        <input type="checkbox"  id="osman"  />
                    </div>
                    <div className="flex justify-between ">
                        <label htmlFor="abshir">Abshir</label>
                        <input type="checkbox"  id="abshir"  />
                    </div>
                    <div className="flex justify-between ">
                        <label htmlFor="unknown">Abdulrahman</label>
                        <input type="checkbox"  id="abdulrahman"  />
                    </div>
                    
                </form>

                <hr className="border-dashed border-2 border-black my-3" />


                


                <div className="flex justify-between p-3  ">
                    <label htmlFor="total">Total</label>
                    <input ref={refTotal} type="text"  className="ml-5 border-2  border-black w-14 text-center" />
                </div>
                <div className="container text-center mt-3 ">
                    <button onClick={addBill} className="btn-primary bg-green-500 active:bg-green-600  text-white text-center p-2 rounded-md mr-6"> Add Bill   </button>
                    <button onClick={CloseModal} className="bg-red-500 text-white text-center p-2 rounded-md active:bg-red-600"  id="cancel"> Cancel  </button>
                </div>
                
            </div>
        </div>
     );
}

export default BillForm;
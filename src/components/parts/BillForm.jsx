import axios from "axios";
import { useEffect, useRef, useState } from "react";


function BillForm(props) {


   

    const refModal = useRef(null);
    const refTotal = useRef(null);

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
        console.log( {
            owner : localStorage.getItem("username"),
            participants: participants,
            total : refTotal.current.value
        });
        
        try {
            const response = await axios.post(`` , {
                owner : localStorage.getItem("username"),
                participants: participants,
                total : refTotal.current.value
            })

            if(!response.ok) {
                throw new Error("Something went wrong, " + response );
            }else{
                console.log("Added!!!");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }


    return ( 
        <div ref={refModal} className="fixed w-screen h-screen top-0 left-0 z-1 bg-black bg-opacity-50 hidden p-12  " onClick={CloseModal}  >
            <div className="bg-white m-auto w-full relative  z-4 block px-3 py-3" id="Modal" >
            
            <h2 className="text-4xl text-center"> New Bill</h2>

                <form className="" onChange={HandleChanges} >
                    <div className="flex justify-between ">
                        <p>Ali</p>
                        <input type="checkbox" name="Ali" id="Ali"  />
                    </div>
                    <div className="flex justify-between ">
                        <p>Husam</p>
                        <input type="checkbox" name="Husam" id="Husam"  />
                    </div>
                    <div className="flex justify-between ">
                        <p>Abdullah</p>
                        <input type="checkbox" name="Husam" id="Abdullah"  />
                    </div>
                    <div className="flex justify-between ">
                        <p>Osman</p>
                        <input type="checkbox" name="Husam" id="Osman"  />
                    </div>
                    <div className="flex justify-between ">
                        <p>Unkonw</p>
                        <input type="checkbox" name="Husam" id="Unkonw"  />
                    </div>
                    
                </form>

                <hr className="border-dashed border-2 border-black my-3" />

                <div className="flex justify-between  ">
                    <label htmlFor="total">Total</label>
                    <input ref={refTotal} type="text"  className="ml-5 border-2  border-black w-14 text-center" />
                </div>
                <div className="container text-center mt-3">
                    <button onClick={addBill} className="btn-primary bg-green-500 active:bg-green-600  text-white text-center p-2 rounded-md mr-4"> Add Bill   </button>
                    <button onClick={CloseModal} className="bg-red-500 text-white text-center p-2 rounded-md active:bg-red-600"  id="cancel"> Cancel  </button>
                </div>
                
            </div>
        </div>
     );
}

export default BillForm;
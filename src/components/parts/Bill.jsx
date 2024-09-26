import axios from "axios";
import { useEffect } from "react";

function Bill(props) {

    const participants = [{username : "Ali" , due : 200 , state: false}  , {username : "Husam" , due : 200 , state: true}  , {username : "Abshir" , due : 200 , state: true} ];
   
    const updateBill = async() =>{
        try {
            const response = await axios.put(`/${props.id}`,{
                name : localStorage.getItem("username"),
                state : true
            });

            if (!response.ok) {
                throw new Error("Something went wrong, " + response );
            }else{
                console.log("Updated!!!");
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  
    return ( 
        <div className="  bg-gray-100 mx-5 mt-2 text-center px-4 rounded-md py-3 ">

            <h1 className="text-4xl">{props.owner} Bill : {props.total}₺</h1>

            <hr className="border-2 border-black border-dashed " />

            <table className="container table-fixed ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>  Due </th>
                        <th> State </th>
                   </tr>
                 
                </thead>
                <tbody>

                    {participants.map((participant , index) =>{
                        return(
                            <tr key={index}>
                                <td>{participant.username}</td>
                                <td>{participant.due}₺</td>
                                {participant.state ?  <td className="text-green-600"> Paid</td> :  <td className="text-red-600"> still</td>}
                            </tr>
                        );
                    } )}
                  
                   
                    
                </tbody>
            </table>

           <div className="text-right flex justify-end text-white  mt-4   " >
                <h2 onClick={updateBill} className=" font-4xl   p-4 bg-red-700 rounded-full active:bg-red-900">Still</h2>
           </div>
        </div>
        
     );
}

export default Bill;
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Bill(props) {

    const navgiate = useNavigate();
    const updateBill = async() =>{
        try {
            const response = await axios.put(`https://paybaby.somee.com/api/bill/edit?id=${props.id}&name=${localStorage.getItem("username")}&state=${true}`,{
                name : localStorage.getItem("username"),
                state : true
            });

            if (response.status != 200) {
                throw new Error("Something went wrong, " + response );
            }else{
                console.log("Updated!!!");
                props.refetch.s(!props.refetch.v);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

    const state =  props.participants.find((participant) => participant.person == localStorage.getItem("username"));
    return ( 
        <div className="  bg-gray-100 mx-5 mt-2 text-center px-4 rounded-md py-3 ">

            <h1 className="text-4xl cc">{props.owner} Bill : {props.total}₺</h1>


            <hr className="border-2 border-black border-dashed mt-4" />
            <p className="my-3">{props.description ? props.description : "There are no details." }</p>
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

                    {props.participants.map((participant , index) =>{
                        return(
                            <tr key={index}>
                                <td className="cc">{participant.person}</td>
                                <td>{participant.due}₺</td>
                                {participant.state ?  <td className="text-green-600"> Paid</td> :  <td className="text-red-600"> still</td>}
                            </tr>
                        );
                    } )}
                  
                   
                    
                </tbody>
            </table>

           <div className="text-right flex justify-between items-center px-5 text-white  mt-4   " >

                <h1 className=" text-[15px] text-[#999]  " >{props.date.toString().split('T')[0]}</h1>    

            {
                state  ? state.state ?  
                <h2  className=" font-4xl   px-3 py-4 bg-green-600 rounded-full "> Paid </h2>
                :   
                <h2 onClick={updateBill} className=" font-4xl   p-4 bg-red-600 rounded-full active:bg-red-900"> Still </h2>
                   
                :null
            }
                
           </div>
        </div>
        
     );
}

export default Bill;
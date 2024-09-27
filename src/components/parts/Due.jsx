import { useEffect } from "react";

function Due(props) {

 
    return ( 
 
        <div className=" bg-gray-100 mx-5 mt-2 text-left px-4 rounded-md py-3 ">
             <h1 className="text-4xl text-center">{props.owner} Bill</h1>

             <hr className="border-2 border-black border-dashed " />
             <div className="mt-4">
                Total Dues : <span className="text-red-600"> {props.totalDues}₺ </span>
             </div>
        </div>
     );
}

export default Due;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [username , setUsername] = useState("");

    
    async function SignIn() {
        try {
            const response = await  axios.post(`https://paybaby.somee.com/api/account/login?name=${username}` );
            console.log(response);
            
            if (response.status != 200) {
                throw new Error("Something went wrong, " + response );
            
            }else{
                localStorage.setItem("username" , username);
                console.log(response);
                
            }
            localStorage.setItem("username" , username);
            navigate('/');
        } catch (error) {
                console.log(error);
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("username")){
            navigate('/');
        }
    },[]);

    
    return ( 
        <main className="flex  items-center h-full  justify-center login-page ">

            <div className=" bg-gray-100  content-center p-6 ">
                <h2 className="text-3xl text-center mb-12">Sign In</h2>
                <form  className="mt-12">
                    <label htmlFor="username" className="mr-3">Username</label>
                    <input type="text"  id="username" className="border-2 border-black" onChange={(e) => setUsername(e.target.value)} />
                </form>
                <div className="flex justify-center mt-12  ">
                    <button onClick={SignIn} className="text-white bg-blue-600 p-2 rounded-lg active:bg-blue-800  ">Submit</button>
                </div>
               
            </div>
          
        </main>
     );
}

export default Login

function Bill() {
    return ( 
        <div className="  bill-box mx-5 mt-2 text-center px-4 rounded-md py-3 ">
            <h1 className="text-4xl">Husam Bill : 100₺</h1>
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
                    <tr>
                        <td>Ali</td>
                        <td>33.3₺</td>
                        <td className="text-green-600"> Paid</td>
                    </tr>
                    <tr>
                        <td>Husam</td>
                        <td>33.3₺</td>
                        <td className="text-red-600"> Sill </td>
                    </tr>
                    <tr>
                        <td>Abdulah</td>
                        <td>33.3₺</td>
                        <td className="text-red-600"> Sill</td>
                    </tr>
                    
                    
                </tbody>
            </table>

           <div className="text-right flex justify-end text-white  mt-4 " >
                <h2 className=" font-4xl   p-4 bg-red-700 rounded-full">Still</h2>
           </div>
        </div>
        
     );
}

export default Bill;
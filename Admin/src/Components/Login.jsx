import { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
export function Login() {
    const[name,setName]=useState("");
    const[pass,setPass]=useState("");
    const[err,setErr]=useState(false);
    const navigate=useNavigate()
    function handleClick(){
        if(name==="dummy@gmail.com" && pass==="dummy1234"){
            setName('')
            setPass('')
            setErr(false)
            navigate('/addItems')
        }
        else{
            setErr(true)
        }
    }
    return (
        <div className="bg-blue-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Company Logo" className="h-40 w-auto rounded-full" />
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-900">Admin Login</h2>
                
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Admin ID</label>
                        <input 
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            type="text" 
                            placeholder="Enter Admin ID"
                            required
                            onChange={(e)=>{setName(e.target.value)}}
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input 
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            type="password" 
                            placeholder="Enter Password"
                            required
                            onChange={(e)=>{setPass(e.target.value)}}
                        />
                    </div>

                    <button 
                        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                        type="button"
                        onClick={handleClick}
                    >
                        Login
                    </button>
                    {err && <p className='text-red-500 text-center'>Enter password or username correctly</p>}
                </form>
            </div>
        </div>
    );
}

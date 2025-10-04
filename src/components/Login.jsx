import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext.jsx"

function Login() {

    const {user, setUser} = useContext(UserContext)

    const [username, setUsername] = useState('mor_2314')
    const [password, setPassword] = useState('83r5^_')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()


    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post('https://fakestoreapi.com/auth/login', { username, password })


            // fetching all users and match current user
            const userRes = await axios.get("https://fakestoreapi.com/users")
            const currentUser = userRes.data.find((user) => user.username === username)

            if(currentUser) {
                setUser(currentUser)
                navigate("/products")
            } else {
                setError(true)
                setErrorMessage("User not found")
                return
            }
            
            
        } catch (error) {
            setError(true)
            if(error.status === 401) {
                setErrorMessage("Invalid Credentials")
            } else {
                setErrorMessage("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='flex justify-center mt-30'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5">
            <legend className="fieldset-legend text-4xl">Login</legend>

            <label className="label">Username</label>
            <input 
                type="text" 
                className="input" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className="label">Password</label>
            <input 
                type="password" 
                className="input mb-2" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />

            <p className='text-red-500 text-center'>{error ? errorMessage : "" }</p>

            <button className="btn btn-neutral mt-2" onClick={handleLogin}>
                {loading && <span className="loading loading-spinner loading-sm"></span>}
                {loading ? "Logging..." : "Login"}
            </button>
        </fieldset>
    </div>
    
  )
}

export default Login
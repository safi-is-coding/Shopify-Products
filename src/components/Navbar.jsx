import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import axios from 'axios'


function Navbar () {

    const navigate = useNavigate()

    const {user} = useContext(UserContext)

    const [cartLength, setCartLength] = useState(0)

    const loggedInUserCart = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.com/carts/${user.id}`)
            setCartLength(res.data.products.length)
            console.log(res.data.products);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loggedInUserCart()
        // console.log(cartLength);
    }, [])


    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="flex-1">
                <NavLink to="/products" className="btn btn-ghost text-xl">Shopify</NavLink>
                {user && <span className='ml-4'>Welcome, {user.name.firstname}</span>}
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator mr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                            <span className="badge badge-sm indicator-item bg-blue-300">{cartLength}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{cartLength} Items</span>
                            {/* <span className="text-info">Subtotal: $999</span> */}
                            <div className="card-actions">
                                <NavLink to="/cart" className="btn btn-primary btn-sm btn-block text-white">View cart</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <NavLink to="/profile" className={({isActive}) => isActive ? " text-blue-600" : ""}>
                                Profile
                            </NavLink>
                        </li>
                        <li><NavLink to="/products" className={({isActive}) => isActive ? "text-blue-600": ""}>Home</NavLink></li>
                        <li><NavLink to="/allUsers" className={({isActive}) => isActive ? "text-blue-600": ""}>Users</NavLink></li>
                        <li><NavLink to="/allCarts" className={({isActive}) => isActive ? "text-blue-600": ""}>All Carts</NavLink></li>
                        <li><NavLink to="/" className="text-red-700">Logout</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar

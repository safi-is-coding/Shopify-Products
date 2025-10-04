import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const {user} = useContext(UserContext)

    if (!user) {
        return <div className='flex justify-center m-20'>User Not Logged In...</div>
    }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10 border border-gray-200">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
            {user.name.firstname} {user.name.lastname}
        </h1>
        <h2 className="text-gray-600 mb-1"><span className="font-semibold">Email:</span> {user.email}</h2>
        <h3 className="text-gray-600 mb-1"><span className="font-semibold">Phone:</span> {user.phone}</h3>
        <h4 className="text-gray-600 mb-1"><span className="font-semibold">Username:</span> {user.username}</h4>
        
        <div className="text-gray-600 mb-1">
            <span className="font-semibold">Address:</span> {user.address.city}, {user.address.street}, {user.address.number}
        </div>
        
        <h6 className="text-gray-500 mb-1"><span className="font-semibold">Zipcode:</span> {user.address.zipcode}</h6>
        <h6 className="text-gray-500 mb-1">
            <span className="font-semibold">Coordinates:</span> {user.address.geolocation.lat}, {user.address.geolocation.long}
        </h6>
    </div>

  )
}

export default Profile
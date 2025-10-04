import React, { useContext } from 'react'
import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'
import UserContext from '../context/UserContext'

function Body() {

  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Body
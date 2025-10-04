import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Products from "./components/Products/Products"
import ProductDetails from './components/Products/ProductDetails'
import Body from './components/Body'
import Login from './components/Login'
import AllUsers from './components/Users/AllUsers'
import { useState } from 'react'
import axios from 'axios'
import AllCarts from './components/Carts/AllCarts'
import SingleCart from './components/Carts/SingleCart'
import UserProvider from "./context/UserProvider.jsx"
import Profile from './components/Users/Profile'


function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
        <Route path='/' element={<Body/>}>
          <Route path='/products' element={<Products/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>

          <Route path='/allUsers' element={<AllUsers/>}/>
          <Route path='/profile' element={<Profile/>}/>


          <Route path='/allCarts' element={<AllCarts/>}/>
          <Route path='/cart' element={<SingleCart/>}/>
          
          <Route path='*' element={<div>404 Not Found</div>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>

    </>
  )
}

export default App

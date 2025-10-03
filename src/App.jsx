import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Products from "./components/Products/Products"
import ProductDetails from './components/Products/ProductDetails'
import Body from './components/Body'
import Login from './components/Login'
import AllUsers from './components/Users/AllUsers'
import { useState } from 'react'
import axios from 'axios'
import AllCarts from './components/Carts/AllCarts'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
        <Route path='/' element={<Body/>}>
          <Route path='/products' element={<Products/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>

          <Route path='/allUsers' element={<AllUsers/>}/>
          <Route path='/allCarts' element={<AllCarts/>}/>
          
          <Route path='*' element={<div>404 Not Found</div>}/>
        </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

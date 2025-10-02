import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Products from "./components/Products/Products"
import ProductDetails from './components/Products/ProductDetails'
import Body from './components/Body'
import Login from './components/Login'

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
          
          <Route path='*' element={<div>404 Not Found</div>}/>
        </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

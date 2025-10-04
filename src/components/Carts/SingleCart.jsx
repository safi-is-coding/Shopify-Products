import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SingleCart() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const [cart, setCart] = useState(null)
  const [allProducts, setAllProducts] = useState([])

  const fetchCartItems = async () => {
    if (!user?.id) return
    try {
      const res = await axios.get(`https://fakestoreapi.com/carts/${user.id}`)
      setCart(res.data)
    } catch (error) {
      console.error("Error fetching cart items:", error)
      navigate("/")
    }
  }

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('https://fakestoreapi.com/products')
      setAllProducts(res.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    fetchCartItems()
    fetchAllProducts()
  }, [user])

  return (
    <div className="p-4 md:p-6">
      {cart ? (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 ">
          <h2 className="text-xl font-semibold mb-4 text-center">Your Cart</h2>

          <div className="flex flex-wrap gap-4 justify-center">
            {cart.products.map((item) => {
              const product = allProducts.find(p => p.id === item.productId)
              if (!product) return null

              return (
                <div
                  key={item.productId}
                  className="flex flex-col items-center w-35 md:w-35 p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-contain mb-2"
                  />
                  <h3 className="font-medium text-center text-[10px] md:text-base">{product.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-green-500 font-semibold mt-1">
                    ${(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 text-right font-semibold text-gray-800">
            Total Items: {cart.products.reduce((total, item) => total + item.quantity, 0)}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm">
            Add some products to your cart to see them here.
          </p>
        </div>
      )}
    </div>
  )
}

export default SingleCart

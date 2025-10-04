import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllCarts() {
  const api = "https://fakestoreapi.com/carts"
  const [carts, setCarts] = useState([])
  const [users, setUsers] = useState({})
  const [products, setProducts] = useState({})

  const fetchAllCart = async () => {
    try {
      const res = await axios.get(api)
      setCarts(res.data)

      // fetch all users
      const userIds = [...new Set(res.data.map(cart => cart.userId))]
      const userRequests = userIds.map(id => axios.get(`https://fakestoreapi.com/users/${id}`))
      const userResponses = await Promise.all(userRequests)

      const userMap = {}
      userResponses.forEach(u => {
        userMap[u.data.id] = u.data
      })
      setUsers(userMap)

      // fetch all products
      const productIds = [...new Set(res.data.flatMap(cart => cart.products.map(p => p.productId)))]
      const productRequests = productIds.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
      const productResponses = await Promise.all(productRequests)

      const productMap = {}
      productResponses.forEach(p => {
        productMap[p.data.id] = p.data
      })
      setProducts(productMap)

    } catch (error) {
      console.log("Error while fetching carts/users/products", error)
    }
  }

  useEffect(() => {
    fetchAllCart()
  }, [])

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        {carts.map(cart => (
          <div key={cart.id} className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="text-gray-800 font-semibold text-lg">
                Cart #{cart.id} - {users[cart.userId] ? users[cart.userId].username : 'Loading...'}
              </div>
              <div className="text-gray-500 text-sm">
                {new Date(cart.date).toLocaleDateString()}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {cart.products.map(product => {
                const productData = products[product.productId]
                return (
                  <div key={product.productId} className="flex justify-between flex-col items-center w-35 p-2 border rounded-lg shadow-sm">
                    {productData ? (
                      <>
                      <div>
                        <img src={productData.image} alt={productData.title} className="w-20 h-20 object-contain mb-2" />
                      </div>
                      <div className='text-center relative bottom-0'>
                        <div className="font-semibold text-center text-[10px]">{productData.title}</div>
                        <div className="text-gray-500 text-sm">
                          ${productData.price} × {product.quantity}
                        </div>
                        <div className="text-green-500 font-bold mt-1">${(productData.price * product.quantity).toFixed(2)}</div>
                      </div>
                      </>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-4 text-right font-semibold text-gray-800">
              Total Items: {cart.products.reduce((total, product) => total + product.quantity, 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllCarts

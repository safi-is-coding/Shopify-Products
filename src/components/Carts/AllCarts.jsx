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

      // fetch all users for these carts
      const userIds = [...new Set(res.data.map(cart => cart.userId))]
      const userRequests = userIds.map(id => axios.get(`https://fakestoreapi.com/users/${id}`))
      const userResponses = await Promise.all(userRequests)

      const userMap = {}
      userResponses.forEach(u => {
        userMap[u.data.id] = u.data
      })
      setUsers(userMap)

      // fetch all products for these carts
      const productIds = [
        ...new Set(res.data.flatMap(cart => cart.products.map(p => p.productId)))
      ]
      const productRequests = productIds.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
      const productResponses = await Promise.all(productRequests)

      const productMap = {}
      productResponses.forEach(p => {
        productMap[p.data.id] = p.data
      })
      setProducts(productMap)

    } catch (error) {
      console.log("Error while fetching carts/users/products", error);
    }
  }

  useEffect(() => {
    fetchAllCart()
  }, [])

  return (
    <div className='p-6'>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total Items</th>
            </tr>
          </thead>
          <tbody>
            {carts.map(cart => (
              <tr key={cart.id} className='hover:bg-base-300'>
                <td>{cart.id}</td>
                <td>
                  {users[cart.userId] ? users[cart.userId].username : "Loading..."}
                </td>
                <td>{new Date(cart.date).toLocaleDateString()}</td>
                <td>
                  {cart.products.map(product => {
                    const productData = products[product.productId]
                    return (
                      <div key={product.productId} className="flex items-center gap-3 mb-2">
                        {productData ? (
                          <>
                            <img src={productData.image} alt={productData.title} className="w-10 h-10 object-contain" />
                            <div>
                              <div className="font-bold">{productData.title}</div>
                              <div className="text-sm text-gray-500">
                                ${productData.price} × {product.quantity}
                              </div>
                            </div>
                          </>
                        ) : (
                          <span>Loading product...</span>
                        )}
                      </div>
                    )
                  })}
                </td>
                <td>{cart.products.reduce((total, product) => total + product.quantity, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllCarts

import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({product}) {

    const navigate = useNavigate()

  return (
    <div className="card bg-base-300 w-96 shadow-sm" onClick={() => navigate(`/product/${product.id}`)}>
    <figure className='bg-gray-300'>
        <img
        src={product.image}
        alt="Shoes" 
        className='w-50 h-60 p-5'
        />
    </figure>
    <div className="card-body">
        <div className='flex justify-between items-center'>
            <div className="badge badge-secondary p-5 font-bold">{'$' + product.price}</div>
        </div>
        <h2 className="card-title">
        {product.title}
        </h2>
        <div className="card-actions justify-end">
        </div>
    </div>
    </div>
  )
}

export default ProductCard
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

function Products() {

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get('https://fakestoreapi.com/products') 
            // const data = await res.json()
            setProducts(res.data)
            setFilteredProducts(res.data)
            
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    }

    const filterProducts = (type) => {
        
        const filter = products.filter((item) => item.category === type)
        if(type === "all") {
            setFilteredProducts(products)
            return
        }
        setFilteredProducts(filter)
    }
    
    useEffect(()=> {
        fetchProducts()
    }, [])


    if(loading) {
        return (
            <div className='flex justify-center items-center min-h-screen '>
                <span className="loading loading-spinner loading-xl text-primary"></span>
            </div>
        )
    }



  return (
    <div className='w-full flex flex-wrap justify-center gap-10 p-10'>

        <div className='w-full flex flex-wrap gap-2 justify-between items-center bg-base-200 p-5 rounded-2xl'>
            <h1 className='text-xl'>Select your categroy</h1>
            <select 
                defaultValue="Select Category" 
                className="select select-primary"
                onChange={(e) => filterProducts(e.target.value)}    
            >
                <option value="all">Show All</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
                <option value="jewelery">jewelery</option>
                <option value="electronics">electronics</option>
            </select>
        </div>

        {
            filteredProducts && 
            filteredProducts.map((item) => {
                return (
                    <ProductCard key={item.id} product={item}/>
                )
            })
        }
    </div>
  )
}

export default Products
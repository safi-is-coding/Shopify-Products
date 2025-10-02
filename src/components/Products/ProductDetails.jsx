import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleProduct = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setDetails(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Product not found!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 mt-10">
      <div className="card lg:card-side bg-base-300 shadow-xl max-w-4xl">
        <figure className="p-6 lg:w-60 h-full flex justify-center bg-base-400">
          <img
            src={details.image}
            alt={details.title}
            className="w-80 h-80 object-contain rounded-lg"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold">{details.title}</h2>
          <p className="text-gray-600">{details.description}</p>
          <p className="text-xl font-semibold mt-4 text-green-600">
            ${details.price}
          </p>
          <p className="text-sm text-gray-500 italic">Category: {details.category}</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-outline">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

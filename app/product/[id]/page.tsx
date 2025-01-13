'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '../../CartContext'

type Product = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const { id } = useParams()
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 mb-8" />
          <div className="h-8 bg-gray-200 mb-4 w-2/3" />
          <div className="h-4 bg-gray-200 mb-2 w-1/3" />
          <div className="h-4 bg-gray-200 w-1/4" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[600px] object-contain p-8"
          />
        </div>
        <div>
          <h1 className="text-3xl mb-4">{product.title}</h1>
          <div className="flex items-center space-x-2 mb-6">
            <button className="w-6 h-6 rounded-full bg-[#E5E0D8] border border-gray-300" />
            <button className="w-6 h-6 rounded-full bg-[#3C3C3C] border border-gray-300" />
          </div>
          <p className="text-2xl mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-8">
            Starting at ${(product.price / 12).toFixed(2)}/mo with Affirm
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          <button
            onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.image })}
            className="w-full bg-black text-white py-4 text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Add to Cart
          </button>
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h2 className="text-lg font-medium mb-4">Product Details</h2>
            <p className="text-gray-600">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


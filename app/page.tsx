'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from './CartContext'

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        const uniqueCategories = Array.from(new Set(data.map((product: Product) => product.category)))
        setCategories(uniqueCategories as string[])
      })
  }, [])

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Navigation */}
      <div className="flex justify-center mb-8 border-b border-gray-200">
        <nav className="flex space-x-8 pb-4">
          <button
            onClick={() => setSelectedCategory('')}
            className={`text-sm hover:text-gray-600 ${selectedCategory === '' ? 'font-medium' : ''}`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm hover:text-gray-600 ${selectedCategory === category ? 'font-medium' : ''}`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="flex flex-col group bg-white p-4">
            <Link href={`/product/${product.id}`} className="relative block bg-gray-100 mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[300px] object-contain p-4 transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center space-x-2 mb-2">
              <button className="w-4 h-4 rounded-full bg-[#E5E0D8] border border-gray-300" />
              <button className="w-4 h-4 rounded-full bg-[#3C3C3C] border border-gray-300" />
            </div>
            <div className="mt-auto">
              <div className="flex flex-col">
                <Link href={`/product/${product.id}`}>
                  <h2 className="text-sm font-normal mb-1">{product.title}</h2>
                </Link>
                <div className="text-sm text-gray-600">
                  ${product.price.toFixed(2)} Starting at ${(product.price / 24).toFixed(2)}/mo or 0% APR with Affirm
                </div>
              </div>
            </div>
            {/* Add to Cart button */}
            <button
              onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.image })}
              className="w-full bg-black text-white py-2 text-lg font-medium hover:bg-gray-800 transition-colors mt-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

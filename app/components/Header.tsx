'use client'

import Link from 'next/link'
import { useCart } from '../CartContext'
import { Search, User, ShoppingCart } from 'lucide-react'
import { CartSidebar } from './CartSidebar'
import { useScroll } from '../hooks/useScroll'

const HERO_IMAGE_URL = "https://media.graphassets.com/resize=w:1920,fit:crop/output=format:webp/quality=value:50/compress/9ROGwZnQYeoNpNWmOBsg"

export default function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useCart()
  const { isUtilityBarVisible } = useScroll() // Update: Removed isThirdNavSticky
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const mainCategories = [
    'Sofas & Modular Seating',
    'Patio Sets',
    'Chairs & Loungers',
    'Coffee Tables',
    'Dining Tables',
    'Dining Chairs & Benches',
    'Rugs',
    'Seating Covers'
  ]

  const filterCategories = [
    'All',
    "men's clothing",
    'jewelery',
    'electronics',
    "women's clothing"
  ]

  const utilityLinks = [
    'Order Lookup',
    'Free Swatches',
    'Showrooms',
    'Refer a Friend',
    'About'
  ]

  return (
    <>
      <header className="relative z-50">
        {/* Utility Navbar */}
        <div 
          className={`bg-[#F5F2ED] transition-transform duration-300 fixed w-full top-0 ${
            isUtilityBarVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
          }`}
        >
          <div className="container mx-auto px-4 h-10 flex items-center justify-between text-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
              </svg>
              Furniture designed for modern life at home
            </div>
            <nav>
              <ul className="flex space-x-6">
                {utilityLinks.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-gray-600">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Navbar */}
        <div className={`bg-white border-b border-gray-200 fixed w-full ${
          isUtilityBarVisible ? 'top-10' : 'top-0'
        }`}>
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                BURROW
              </Link>
              
              <nav className="hidden md:flex items-center space-x-8">
                {mainCategories.map((category) => (
                  <Link
                    key={category}
                    href="#"
                    className="text-sm hover:text-gray-600"
                  >
                    {category}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm"
                  />
                  <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button className="hover:text-gray-600">
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)} 
                  className="hover:text-gray-600 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Filter Categories */}
        <div className="pt-[104px]">
          {/* Filter Categories Navbar */}
          <div className="bg-white border-b border-gray-200 relative">
            <div className="container mx-auto px-4">
              <nav className="flex items-center justify-center h-12">
                <ul className="flex space-x-8">
                  {filterCategories.map((category) => (
                    <li key={category}>
                      <Link
                        href="#"
                        className="text-sm hover:text-gray-600"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="relative h-[500px]">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${HERO_IMAGE_URL})`
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
              <h1 className="text-5xl font-bold mb-4 text-shadow">Outdoor Furniture</h1>
              <p className="text-xl max-w-lg text-shadow">
                Modular seating, patio designs, and outdoor dining sets all made with durable, all-weather materials.
              </p>
            </div>
          </div>
        </div>

      </header>

      <CartSidebar 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}


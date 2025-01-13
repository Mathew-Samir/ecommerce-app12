'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../CartContext'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import { CartSidebar } from './CartSidebar'
import { useScroll } from '../hooks/useScroll'
import { useState, useRef } from 'react'

const HERO_IMAGE_URL = "https://media.graphassets.com/resize=w:1920,fit:crop/output=format:webp/quality=value:50/compress/9ROGwZnQYeoNpNWmOBsg"

export default function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useCart()
  const { isUtilityBarVisible } = useScroll()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null) // Ref for search input

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
          className={`bg-[#F5F2ED] transition-transform duration-300 fixed w-full top-0 z-50 ${isUtilityBarVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
          <div className="container mx-auto px-4 h-10 flex items-center justify-between text-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
              </svg>
              <span className="hidden sm:inline">Furniture designed for modern life at home</span>
              <span className="sm:hidden">Modern Furniture</span>
            </div>
            <nav className="hidden sm:block">
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
        <div className={`bg-white border-b border-gray-200 fixed w-full z-50 ${isUtilityBarVisible ? 'top-10' : 'top-0'}`}>
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                className="sm:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Toggle Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link href="/" className="text-2xl font-bold">
                BURROW
              </Link>

              {/* Main Categories (Hidden on Mobile) */}
              <nav className="hidden sm:flex items-center space-x-8">
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

              {/* Search, User, and Cart Icons */}
              <div className="flex items-center space-x-6">
                {/* Search Input (Visible on Medium Screens) */}
                <div className="hidden sm:block relative">
                  <input
                    type="text"
                    placeholder="Search products"
                    className="pl-8 pr-4 py-1 border border-gray-300 rounded-md text-sm"
                    ref={searchInputRef}
                  />
                  <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Search Icon (Visible on Mobile) */}
                <button
                  className="sm:hidden hover:text-gray-600"
                  onClick={() => searchInputRef.current?.focus()} // Focus the search input
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* User Icon */}
                <button
                  aria-label="User Profile"
                  className="hover:text-gray-600"
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Cart Icon */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-gray-600 relative"
                  aria-label="Shopping Cart"
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

        {/* Hero Section */}
        <div className="pt-[104px] relative">
          <div className="relative h-[300px] sm:h-[350px] z-0"> {/* z-0 ensures this stays below the navbar */}
            <Image
              src={HERO_IMAGE_URL}
              alt="Outdoor Furniture Hero Image"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 z-10" /> {/* Overlay */}
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white z-20">
              <h1 className="text-2xl sm:text-3xl mb-4 text-shadow">Outdoor Furniture</h1>
              <p className="text-lg sm:text-xl max-w-lg text-shadow">
                Modular seating, patio designs, and outdoor dining sets all made with durable, all-weather materials.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="relative w-64 h-full bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex-1 text-center">
              <Link href="/" className="text-2xl font-bold">
                BURROW
              </Link>
            </div>
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {mainCategories.map((category) => (
                <li key={category}>
                  <Link
                    href="#"
                    className="block text-sm hover:text-gray-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}

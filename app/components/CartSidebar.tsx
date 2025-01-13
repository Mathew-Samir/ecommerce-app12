'use client'

import { X, Plus, Minus } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useCart } from '../CartContext'
import Image from 'next/image'

export function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <div className="py-4 border-b">
          <h2 className="text-lg px-6">
            Cart {cart.length} items
          </h2>
        </div>
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 hover:opacity-70"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col h-full py-6">
          <div className="flex-1 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex py-6 border-b">
                <div className="h-24 w-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium">
                    <h3>{item.title}</h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-gray-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between text-base mb-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base mb-6">
              <p>Shipping</p>
              <p>Calculated at checkout</p>
            </div>

            <button className="w-full bg-[#F7E033] py-3 text-black font-medium hover:bg-[#f4db20] mb-4">
              SECURE CHECKOUT
            </button>
            
            <button className="w-full text-center text-sm font-medium hover:text-gray-600 mb-8">
              SAVE FOR LATER
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


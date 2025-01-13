import { Inter } from 'next/font/google'
import { CartProvider } from './CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce Store',
  description: 'Modern furniture e-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}


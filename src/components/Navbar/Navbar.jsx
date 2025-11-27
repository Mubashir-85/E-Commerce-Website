import {  useContext } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { CartContext } from '../ContextProvider/CartProvider'
import { Link } from 'react-router-dom'


function Navbar() {
  const {cartCount} = useContext(CartContext)
  const hideicon =  ()=>{
    if(cartCount===0){
      return "hidden"
    }
  }
  

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left - Logo & Name */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center">
              {/* <span className="text-white font-bold text-lg sm:text-xl">E</span> */}
              <img src="shopping-cart-3d-render-icon.jpg" alt="" />
            </div>
            <Link  to="/" className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              E-Commerce
            </Link>
          </div>

          {/* Right - Cart Icon */}
          <Link to="/cart" className="flex items-center gap-4">
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart size={28} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <span className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
import { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "./ContextProvider/CartProvider";

function Product({ Product }) {
  const { addtocart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full max-w-xs md:max-w-sm">
      {/* Product Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <img
          src={
            Product?.image ||
            "https://via.placeholder.com/800x600?text=No+Image"
          }
          alt={Product?.title || "Product"}
          loading="lazy"
          className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Content */}
      <div className="flex flex-col grow p-3 sm:p-4 md:p-5">
        {/* Title */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition">
          {Product.title || "Product Title"}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 grow">
          {Product.description || "Product description goes here"}
        </p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              ${Product.price || "0.00"}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addtocart(Product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 active:scale-95 transform"
        >
          <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

export default Product;

import  { createContext, useState, useEffect } from 'react'
export const CartContext = createContext() 

function CartProvider({children}) {
    const [cart, setCart]= useState([])
    function addtocart(Product){
        try {
                 const raw = localStorage.getItem('cart') || '[]';
                 const cart = JSON.parse(raw);
                 const existing = cart.find((c) => c.id === Product.id);
                 if (existing) {
                   existing.quantity = (existing.quantity || 1) + 1;

                 } else {
                   cart.push({
                     id: Product.id,
                     title: Product.title || 'Product',
                     price: Number(Product.price) || 0,
                     image: Product.image || null,
                     quantity: 1,
                   });
                 }
                 localStorage.setItem('cart', JSON.stringify(cart));
                 // notify other components
                 window.dispatchEvent(new Event('cartUpdated'));
               } catch (e) {
                 console.error('Failed to add to cart', e);
               }
    }

    // local state to hold the number shown on the badge
  const [cartCount, setCartCount] = useState(0)

  // Helper: read the 'cart' from localStorage and return total quantity
  function getCartCountFromStorage() {
    const json = localStorage.getItem('cart') // returns string or null
    if (!json) return 0                      // nothing saved yet
    try {
      const cart = JSON.parse(json)          // parse to array
      // sum the quantities (if quantity missing, assume 1)
      let total = 0
      for (let item of cart) {
        total += Number(item.Product || 1)
      }
      return total
    } catch (err) {
      console.error('Could not parse cart from storage', err)
      return 0
    }
  }

  // Run once on mount: read initial count and subscribe to updates
  useEffect(() => {
    // set initial value
    setCartCount(getCartCountFromStorage())

    // When your Product code saves to localStorage it should call:
    //   window.dispatchEvent(new Event('cartUpdated'))
    // We listen for that and update the badge.
    function onCartUpdated() {
      setCartCount(getCartCountFromStorage())
    }

    window.addEventListener('cartUpdated', onCartUpdated) 

    
  }, [])

  return (
    <CartContext.Provider value={{cart, addtocart, cartCount}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider
import React, { useEffect, useState } from "react";

function Cart() {
  // Step 1: Create state to hold the items in the cart
  // items = list of products
  // setItems = function to update the list
  const [items, setItems] = useState([]);
  


  // Step 2: Create state for messages
  const [message, setMessage] = useState("");

  // FUNCTION 1: Load cart from localStorage and display it
  const loadCart = () => {
    try {
      // Read the cart from localStorage (it's saved as a string)
      const raw = localStorage.getItem("cart") || "[]";

      // Convert the string back to an array
      const cart = JSON.parse(raw);

      // Update the items state with the cart data
      setItems(Array.isArray(cart) ? cart : []);
    } catch (e) {
      // If something goes wrong, just show empty cart
      console.error("Failed to load cart", e);
      setItems([]);
    }
  };

  // Step 3: Run loadCart() when the page loads and listen for updates
  useEffect(() => {
    // Load cart once
    loadCart();

    // Listen for the 'cartUpdated' event (fired when user adds items)
    const handler = () => loadCart();
    window.addEventListener("cartUpdated", handler);

    // Cleanup: remove the listener when component unmounts
    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  // FUNCTION 2: Calculate the subtotal (total price of all items)
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = Number(item.price || 0) * (item.quantity || 1);
    return sum + itemTotal;
  }, 0);

  // FUNCTION 3: Empty the cart (delete all items)
  const emptyCart = () => {
    // Remove cart from localStorage
    localStorage.removeItem("cart");

    // Clear the items array
    setItems([]);

    // Show a message
    setMessage("Your cart is empty — buy something");

    // Notify other parts of app that cart changed
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // FUNCTION 4: Increase the quantity of a product by 1
  const increaseQuantity = (productId) => {
    // Create a new copy of items with updated quantity
    const updatedItems = items.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    
    // Update the state
    setItems(updatedItems);
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // FUNCTION 5: Decrease the quantity of a product by 1
  const decreaseQuantity = (productId) => {
    // Create a new copy of items
    const updatedItems = items
      .map((item) => {
        if (item.id === productId) {
          // If quantity is 1, don't go below 1
          return { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) };
        }
        return item;
      });
    
    // Update the state
    setItems(updatedItems);
    
    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // FUNCTION 6: Handle checkout
  const checkout = () => {
    // Check: Is the cart empty?
    if (items.length === 0) {
      setMessage("No items to checkout");
      return;
    }

    // Get the total price
    const total = subtotal.toFixed(2);

    // Show thank you message
    setMessage(`Thank you — your order of $${total} has been placed.`);

    // Remove the cart from localStorage
    localStorage.removeItem("cart");

    // Clear the items
    setItems([]);

    // Notify other parts of app
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <div className="p-6 text-center border rounded bg-white">
          <p className="text-gray-700">There are no items — buy something.</p>
          {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-3 bg-white rounded shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-gray-500">No image</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  
                  {/* Quantity controls: - and + buttons */}
                  <div className="flex items-center gap-2 mt-2">
                    {/* Decrease button */}
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded text-sm"
                    >
                      −
                    </button>
                    
                    {/* Show current quantity */}
                    <span className="px-3 text-sm font-semibold">
                      {item.quantity || 1}
                    </span>
                    
                    {/* Increase button */}
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 hover:bg-gray-400 text-black px-2 py-1 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    ${(Number(item.price) || 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    $
                    {((Number(item.price) || 0) * (item.quantity || 1)).toFixed(
                      2
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="font-semibold">Subtotal</div>
            <div className="font-bold text-lg text-green-600">
              ${subtotal.toFixed(2)}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={emptyCart}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Empty Cart
            </button>

            <button
              onClick={checkout}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Checkout
            </button>
          </div>

          {message && (
            <div className="mt-3 text-sm text-green-700">{message}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;

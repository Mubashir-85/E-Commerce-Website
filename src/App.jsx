import { useEffect, useState } from "react";
import "./App.css";
import Products from "./components/Products.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CartProvider from "./components/ContextProvider/CartProvider.jsx";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";

function App() {
  const url = `${import.meta.env.VITE_FAKE_URL}/products`;
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    const res = await fetch("https://fakestoreapi.com/carts");
    const data = await res.text();
    setCart(data);
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
    fetchCart();
  }, []);
  console.log();

  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products products={products} />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

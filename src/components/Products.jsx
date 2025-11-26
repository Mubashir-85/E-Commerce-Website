import React, { useEffect, useState } from "react";
import Product from "./Product.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const url = `${import.meta.env.VITE_FAKE_URL}/products`;

  const fetchCart = async () => {
    const res = await fetch("https://fakestoreapi.com/carts");
    const data = await res.text();
    setCart(data);
  };

  const handleCart = async (productId, quantity) => {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: Math.random(),
        title: products.title,
        price: products.price,
        description: products.description,
        product: [{ productId, quantity }],
      }),
    });
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
    <>
      <main>
        <div className="mt-10 px-5 flex flex-col md:flex-row md:flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full md:w-1/3 lg:w-1/4 flex justify-center"
            >
              <Product Product={product} handleCart={handleCart} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Products;

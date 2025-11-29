import React, { useEffect, useState } from "react";
import Product from "./Product.jsx";

function Products({handleCart, products}) {
 
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

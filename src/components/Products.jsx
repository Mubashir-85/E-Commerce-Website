import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product.jsx";

function Products() {
  const products = [
    { id: 1, name: "Product 1", price: 29.99, description: "This is product 1" },
    { id: 2, name: "Product 2", price: 39.99, description: "This is product 2" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
    { id: 3, name: "Product 3", price: 19.99, description: "This is product 3" },
  ];
  return (
    <>
      <main>
        <Grid container justify="center" spacing={4} className="p-10 m-10 ">
          {products.map((products) => (
            <Grid size={3} spacing={5} item key={products.id} xs={12} sm={6} md={4} lg={3}>
                <Product Product={products}/>
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
}

export default Products;

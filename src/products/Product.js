// Products.js

import React from "react";
import "./products.css";
import { FaAmazon } from "react-icons/fa";

import productsData from "./products.json";

export function Products() {
  return (
    <div className="products">
      <div className="products-header">
        <h1>
          Our Featured<p>Products</p>
        </h1>
      </div>
      <div className="products-list">
        {productsData.products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name}></img>
            </div>
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <div className="amazon-link">
                <a
                  href={product.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaAmazon />
                  View on Amazon
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

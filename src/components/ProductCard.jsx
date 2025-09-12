import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>  
    <Card className="h-100 border-0 shadow-sm rounded-3 product-card transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      {/* --- Top overlay (Sale + Heart) --- */}
      <div className="card-top-icons d-flex justify-content-between px-2 pt-2">
        {product.isSale && (
          <Badge bg="danger" className="px-2 py-1 rounded-pill">
            Sale
          </Badge>
        )}
        <FaHeart className="wishlist-icon fs-5 text-muted cursor-pointer hover:text-[#9A3F3F] transition" />
          <button
              onClick={() => addToWishlist(product)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100"
            >
              ❤️
      </button>
        
      </div>

      {/* --- Product image with overlay --- */}
      <div className="image-container position-relative">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="product-img rounded-top"
        />
        <div className="overlay d-flex justify-content-center align-items-center">
          <Button
            onClick={() => addToCart(product, 1)}
            className="overlay-btn px-4 py-2 fw-semibold rounded-pill"
            style={{ backgroundColor: "#9A3F3F", border: "none" }}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* --- Card Body --- */}
      <Card.Body className="d-flex flex-column p-3">
        {/* Category + Rating */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge
            bg="light"
            text="dark"
            className="px-3 py-1 border rounded-pill"
          >
            {product.category}
          </Badge>
          <span className="rating d-flex align-items-center text-sm text-muted">
            <FaStar className="text-warning me-1" /> {product.rating} (
            {product.reviews})
          </span>
        </div>

        {/* Title */}
        <Card.Title className="fw-bold text-lg mb-2 text-[#9A3F3F]">
          {product.name}
        </Card.Title>

        {/* Prices */}
        <div className="mt-auto">
          <span className="fw-bold fs-5 me-2" style={{ color: "#9A3F3F" }}>
            ₹{product.price}
          </span>
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
    </Link>
  );
}

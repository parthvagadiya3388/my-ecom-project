import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FaStar, FaEye, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { BiHeart } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Calculate average rating
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
    : product.rating || 0;

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 product-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      {/* --- Top overlay (Sale + Heart) --- */}
      <div className="card-top-icons position-absolute d-flex justify-content-between w-100 px-3 pt-3 z-2">
        <div>
          {product.isSale && (
            <Badge
              bg="danger"
              className="px-2 py-1 rounded-pill fw-semibold shadow-sm"
            >
              {Math.round(
                ((product.oldPrice - product.price) / product.oldPrice) * 100
              )}
              % OFF
            </Badge>
          )}
        </div>
        <button
          onClick={handleWishlistClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="bg-white/90 backdrop-blur-sm p-2 rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
          style={{ width: "36px", height: "36px" }}
        >
          {isWishlisted ? (
            <BsFillHeartFill
              className="text-danger"
              style={{ fontSize: "16px" }}
            />
          ) : hovered ? (
            <BsFillHeartFill
              className="text-danger"
              style={{ fontSize: "16px" }}
            />
          ) : (
            <BiHeart style={{ fontSize: "16px" }} />
          )}
        </button>
      </div>

      {/* --- Product image with overlay --- */}
      <div
        className="image-container position-relative overflow-hidden"
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <Card.Img
          variant="top"
          src={
            typeof product.image !== "string" && product.image.length
              ? product.image[0]
              : product.image
          }
          alt={product.name}
          className="product-img w-100"
          style={{
            height: "220px",
            objectFit: "cover",
            transform: imgHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            opacity: imgHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="d-flex gap-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="rounded-pill d-flex align-items-center gap-1 px-3 py-2"
              style={{
                backgroundColor: "#9A3F3F",
                border: "none",
                fontSize: "14px",
              }}
            >
              <FaShoppingCart /> Cart
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button
                className="rounded-pill d-flex align-items-center gap-1 px-3 py-2"
                style={{
                  backgroundColor: "white",
                  color: "#9A3F3F",
                  border: "none",
                  fontSize: "14px",
                }}
              >
                <FaEye /> View
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- Card Body --- */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Body className="d-flex flex-column p-3 pb-2">
          {/* Category */}
          <div className="flex justify-between items-center mb-2">
            <Badge
              bg
              className="border rounded-full text-xs uppercase"
              style={{ backgroundColor: "#E6CFA9", color: "#9A3F3F" }}
            >
              {product.category}
            </Badge>

            <div className="flex items-center">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < Math.round(avgRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-xs">
                ({product.reviews?.length || 0})
              </span>
            </div>
          </div>

          {/* Title */}
          <Card.Title
            className="fw-semibold text-dark"
            style={{
              fontSize: "16px",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "40px",
            }}
          >
            {product.name}
          </Card.Title>

          {/* Prices */}
          <div className="mt-auto d-flex align-items-center gap-2">
            <span className="fw-bold fs-6 text-dark">
              ₹{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span
                className="text-muted text-decoration-line-through"
                style={{ fontSize: "14px" }}
              >
                ₹{product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

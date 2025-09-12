import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaShoppingCart,
  FaBolt,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import products from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? null);
  const [activeTab, setActiveTab] = useState("description");
  const [isZoomed, setIsZoomed] = useState(false);
  const galleryRef = useRef(null);
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    // reset when product changes (if user navigates between products)
    setImgIndex(0);
    setQty(1);
    setSelectedColor(product?.colors?.[0] ?? null);
    setSelectedSize(product?.sizes?.[0] ?? null);
    setActiveTab("description");
  }, [product]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
  };

  if (!product) {
    return <div className="py-20 text-center">Product not found.</div>;
  }

  const inStock = product.stock && product.stock > 0;
  const isWishlisted = wishlist.some((w) => w.id === product.id);

  const handleAddToCart = () => {
    // build a cart item payload (you can extend structure in cart context)
    const item = {
      ...product,
      quantity: qty,
      selectedColor,
      selectedSize,
    };
    addToCart(item, qty);
    showNotification("Added to cart successfully!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      showNotification("Removed from wishlist");
    } else {
      addToWishlist(product);
      showNotification("Added to wishlist!");
    }
  };

  // Navigate images with arrows
  const nextImage = () => {
    setImgIndex((prev) => 
      prev === (product.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setImgIndex((prev) => 
      prev === 0 ? (product.images?.length || 1) - 1 : prev - 1
    );
  };

  // Average rating (safe calculation)
  const avgRating = useMemo(() => {
    if (!Array.isArray(product.reviews) || product.reviews.length === 0)
      return 0;
    const sum = product.reviews.reduce((s, r) => s + (r.rating || 0), 0);
    return +(sum / product.reviews.length).toFixed(1);
  }, [product]);

  // Related products - exclude current
  const related = products.filter((p) => p.id !== product.id).slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 bg-[#9A3F3F] text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn">
          {notification.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-10">
        {/* left: gallery */}
        <div className="relative">
          <div
            className="relative rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.images?.[imgIndex] ?? product.image}
              alt={product.name}
              className={`w-full object-cover transition-transform duration-500 ease-out ${
                isZoomed ? "scale-110" : "scale-100"
              }`}
              style={{ maxHeight: 520 }}
            />

            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#9A3F3F] p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 text-[#9A3F3F] p-2 rounded-full shadow-md hover:bg-white transition-all"
              aria-label="Next image"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>

            {/* Wishlist floating */}
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:scale-105 transition-all"
              aria-label="Wishlist"
            >
              <FaHeart
                className={`w-5 h-5 ${
                  isWishlisted 
                    ? "text-red-500 fill-current animate-pulse" 
                    : "text-gray-400 hover:text-red-300 transition-colors"
                }`}
              />
            </button>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {imgIndex + 1} / {product.images?.length || 1}
            </div>
          </div>

          {/* thumbnails */}
          <div
            ref={galleryRef}
            className="mt-5 flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-[#9A3F3F] scrollbar-track-gray-100"
          >
            {(product.images ?? [product.image]).map((src, idx) => (
              <button
                key={idx}
                onClick={() => setImgIndex(idx)}
                className={`flex-none rounded-lg overflow-hidden border-2 transition-all ${
                  idx === imgIndex 
                    ? "border-[#9A3F3F] scale-105" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ width: 80, height: 80 }}
              >
                <img
                  src={src}
                  alt={`${product.name}-${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* right: details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#9A3F3F] mb-2">
              {product.name}
            </h1>
            
            {/* Brand */}
            {product.brand && (
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                By {product.brand}
              </p>
            )}
          </div>

          {/* rating + reviews + sku */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <div className="flex items-center mr-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const filled = i < Math.round(avgRating);
                  return filled ? (
                    <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                  ) : (
                    <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
                  );
                })}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {avgRating}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              ({product.reviews?.length ?? 0} reviews)
            </div>
            <div className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border">
              SKU: {product.sku ?? "—"}
            </div>
          </div>

          {/* price + discount */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-2xl font-extrabold text-[#C1856D]">
              ₹{product.price.toLocaleString()}
            </div>
            {product.oldPrice && (
              <div className="text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString()}
              </div>
            )}
            {product.isSale && (
              <div className="px-3 py-1 rounded-full bg-[#E6CFA9] text-[#9A3F3F] font-semibold text-sm">
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}
                % OFF
              </div>
            )}
            {!inStock ? (
              <div className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                Out of stock
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm flex items-center">
                <FaCheck className="mr-1" /> In stock
              </div>
            )}
          </div>

          {/* short description */}
          <p className="text-gray-700 leading-relaxed border-l-4 border-[#E6CFA9] pl-4 py-1">
            {product.shortDescription ?? product.description}
          </p>

          {/* variants */}
          <div className="flex flex-col gap-5">
            {/* colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="text-sm mb-2 font-medium flex justify-between">
                  <span>Color: {selectedColor}</span>
                  <span className="text-gray-500">Required</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedColor === c
                          ? "ring-2 ring-offset-2 ring-[#E6CFA9] scale-110"
                          : "opacity-90 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={`Select color ${c}`}
                    >
                      {selectedColor === c && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="text-sm mb-2 font-medium flex justify-between">
                  <span>Size: {selectedSize}</span>
                  <span className="text-gray-500">Required</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-md border transition-all ${
                        selectedSize === s
                          ? "bg-[#9A3F3F] text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 hover:border-[#9A3F3F]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* qty + actions */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-sm mb-1 font-medium">Quantity</span>
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={qty}
                    min={1}
                    onChange={(e) =>
                      setQty(Math.max(1, Number(e.target.value || 1)))
                    }
                    className="w-12 text-center border-l border-r focus:outline-none focus:ring-1 focus:ring-[#9A3F3F]"
                  />
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-lg hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 mt-5">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex items-center justify-center gap-3 text-white px-5 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 ${
                    inStock
                      ? "bg-gradient-to-r from-[#9A3F3F] to-[#C1856D] hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!inStock}
                  className={`px-4 py-3 rounded-full border transition-all ${
                    inStock
                      ? "border-[#9A3F3F] text-[#9A3F3F] hover:bg-[#9A3F3F] hover:text-white"
                      : "border-gray-400 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FaTruck className="text-[#9A3F3F]" />
              </div>
              <div>
                <div className="font-medium">Free Shipping</div>
                <div className="text-xs">On orders over ₹5000</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FaUndo className="text-[#9A3F3F]" />
              </div>
              <div>
                <div className="font-medium">Easy Returns</div>
                <div className="text-xs">30 days return policy</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FaShieldAlt className="text-[#9A3F3F]" />
              </div>
              <div>
                <div className="font-medium">Secure Payment</div>
                <div className="text-xs">Safe and encrypted</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FaBolt className="text-[#9A3F3F]" />
              </div>
              <div>
                <div className="font-medium">Fast Delivery</div>
                <div className="text-xs">2-5 business days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 px-1 font-medium transition-all ${
                activeTab === "description"
                  ? "border-b-2 border-[#9A3F3F] text-[#9A3F3F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`py-4 px-1 font-medium transition-all ${
                activeTab === "info"
                  ? "border-b-2 border-[#9A3F3F] text-[#9A3F3F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Additional Info
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-1 font-medium transition-all ${
                activeTab === "reviews"
                  ? "border-b-2 border-[#9A3F3F] text-[#9A3F3F]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews ({product.reviews?.length ?? 0})
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === "description" && (
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-[#9A3F3F]">Product Description</h3>
              <p className="leading-relaxed">{product.description}</p>
              
              {product.features && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {activeTab === "info" && (
            <div className="text-gray-700">
              <h4 className="text-xl font-semibold mb-4 text-[#9A3F3F]">Product Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span>{product.brand ?? "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Model</span>
                  <span>{product.model ?? "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Warranty</span>
                  <span>{product.warranty ?? "1 year"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Weight</span>
                  <span>{product.weight ?? "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Dimensions</span>
                  <span>{product.dimensions ?? "—"}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Material</span>
                  <span>{product.material ?? "—"}</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {product.reviews?.length ? (
                <>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-[#9A3F3F]">{avgRating}</div>
                      <div>
                        <div className="flex items-center mb-1">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const filled = i < Math.round(avgRating);
                            return filled ? (
                              <FaStar key={i} className="text-yellow-400 w-5 h-5 mr-1" />
                            ) : (
                              <FaRegStar key={i} className="text-gray-300 w-5 h-5 mr-1" />
                            );
                          })}
                        </div>
                        <p className="text-gray-600">Based on {product.reviews.length} reviews</p>
                      </div>
                    </div>
                  </div>
                  
                  {product.reviews.map((r, idx) => (
                    <div key={idx} className="p-6 border rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9A3F3F] to-[#C1856D] flex items-center justify-center font-medium text-white">
                            {(r.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-xs text-gray-500">{r.date}</div>
                          </div>
                        </div>
                        <div className="text-yellow-400 flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < r.rating
                                  ? "w-4 h-4"
                                  : "w-4 h-4 text-gray-200"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <FaStar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-[#9A3F3F] mb-6 pb-2 border-b">
          You might also like
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {related.map((p) => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {p.isSale && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#E6CFA9] text-[#9A3F3F] text-xs font-semibold">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold text-sm mb-1 line-clamp-1">{p.name}</div>
                <div className="flex items-center gap-2">
                  <div className="text-[#C1856D] font-bold">₹{p.price.toLocaleString()}</div>
                  {p.oldPrice && (
                    <div className="text-gray-400 text-sm line-through">
                      ₹{p.oldPrice.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const avg = p.reviews?.length 
                      ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length 
                      : 0;
                    const filled = i < Math.round(avg);
                    return filled ? (
                      <FaStar key={i} className="text-yellow-400 w-3 h-3 mr-1" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300 w-3 h-3 mr-1" />
                    );
                  })}
                  <span className="text-xs text-gray-500 ml-1">({p.reviews?.length || 0})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sticky bottom bar on mobile */}
      <div className="md:hidden fixed left-0 right-0 bottom-0 z-50 bg-white border-t shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-lg font-bold text-[#9A3F3F]">
              ₹{product.price.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleWishlist}
              className="p-3 rounded-full bg-gray-100"
              aria-label="Wishlist"
            >
              <FaHeart
                className={`w-5 h-5 ${
                  isWishlisted ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="px-5 py-3 bg-gray-800 text-white rounded-full disabled:bg-gray-400"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className="px-5 py-3 bg-[#9A3F3F] text-white rounded-full disabled:bg-gray-400"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
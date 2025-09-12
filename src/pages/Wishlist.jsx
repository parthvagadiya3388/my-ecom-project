import React from "react";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-[#9A3F3F] mb-3">
          Your Wishlist is Empty ❤️
        </h2>
        <p className="text-gray-500">Start adding products you love!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8 text-[#9A3F3F]">My Wishlist</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition relative"
          >
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-200"
            >
              ❌
            </button>
            <img
              src={item.image}
              alt={item.name}
              className="rounded-lg mb-3 w-full h-48 object-cover"
            />
            <h5 className="font-semibold">{item.name}</h5>
            <p className="text-[#C1856D] font-bold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

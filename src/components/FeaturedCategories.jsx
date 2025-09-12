import React from "react";
import { FaHeadphones, FaClock, FaLaptop, FaCamera, FaMobileAlt, FaTabletAlt } from "react-icons/fa";

const categories = [
  { id: 1, name: "Headphones", icon: <FaHeadphones />, color: "#9A3F3F" },
  { id: 2, name: "Smart Watches", icon: <FaClock />, color: "#C1856D" },
  { id: 3, name: "Laptops", icon: <FaLaptop />, color: "#E6CFA9" },
  { id: 4, name: "Cameras", icon: <FaCamera />, color: "#9A3F3F" },
  { id: 5, name: "Mobiles", icon: <FaMobileAlt />, color: "#C1856D" },
  { id: 6, name: "Tablets", icon: <FaTabletAlt />, color: "#E6CFA9" },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-[#fef2f2]">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#9A3F3F]">Featured Categories</h2>
          <p className="text-gray-600">Shop by your favorite category</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              style={{ borderTop: `4px solid ${cat.color}` }}
            >
              <div
                className="text-4xl mb-4 p-4 rounded-full"
                style={{ backgroundColor: cat.color, color: "#fff" }}
              >
                {cat.icon}
              </div>
              <h4 className="font-semibold text-gray-800">{cat.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

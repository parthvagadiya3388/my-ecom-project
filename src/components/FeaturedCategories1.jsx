import React from "react";

const categories = [
  {
    id: 1,
    name: "Men’s Fashion",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 2,
    name: "Women’s Fashion",
    image: "https://images.pexels.com/photos/13275792/pexels-photo-13275792.jpeg?cs=srgb&dl=pexels-kacao-13275792.jpg&fm=jpg",
  },
  {
    id: 3,
    name: "Electronics",
    image: "https://live.staticflickr.com/3907/15229446155_4df8215db8_b.jpg",
  },
  {
    id: 4,
    name: "Home & Living",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpybKlpO02QKyPXHnRZ4ypBRRmPehxtKESiqHQVYkRmBcAko-THFsSzUT8aLa6UL4ITNw&usqp=CAU",
  },
  {
    id: 5,
    name: "Beauty & Care",
    image: "https://images.pexels.com/photos/19150552/pexels-photo-19150552.jpeg?cs=srgb&dl=pexels-michael-pointner-134459625-19150552.jpg&fm=jpg",
  },
  {
    id: 6,
    name: "Sports & Fitness",
    image: "https://images.pexels.com/photos/11106314/pexels-photo-11106314.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

export default function FeaturedCategories1() {
  return (
    <section className="py-16 bg-[#fef2f2]">
    {/* <section className="py-16"> */}
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#9A3F3F]">
            Featured Categories
          </h2>
          <p className="text-[#C1856D] mt-2">
            Shop by categories and explore our wide range of products.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-semibold text-lg">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

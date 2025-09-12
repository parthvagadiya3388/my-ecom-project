import React from "react";
import { FaStar } from "react-icons/fa";

// Dummy data
const testimonials = [
  {
    id: 1,
    name: "Alice",
    review: "Amazing service and high-quality products. Loved shopping here!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Bob",
    review: "Fast delivery and very responsive support team. Highly recommended!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Charlie",
    review: "Great variety and affordable prices. Will shop again!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const brands = [
  "https://avatars.mds.yandex.net/i?id=774a6ea64199c28baf651fb8db16dbdf76642710-4841286-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=a886c4cb452756649805eb2d6001a211acfabc87-5234060-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=f7e0c8069bb2458ea29a5238c2f810f602456e76-12528722-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=be0324cb898099a748bc134227bfbd4041d5fa4b-10640295-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=03e8b687c726bb77e3d739bec2bb287df276ebe6-8285735-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=4fa4e6b8d6fa693c9734e8e6bc80fdf207639556-4590839-images-thumbs&n=13",
];

const TestimonialsAndBrands = () => {
  return (
    <section className="py-16 bg-[#fef2f2]">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#9A3F3F]">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">Trusted by thousands of happy buyers</p>
        </div>

        {/* Testimonials Slider (static grid for now) */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(t.rating)}
                    {"☆".repeat(5 - t.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{t.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndBrands;

import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
   <section className="relative bg-[#fef2f2] overflow-hidden">
  {/* Decorative shapes */}
  <div className="absolute top-0 left-0 w-40 h-40 bg-[#E6CFA9] rounded-full blur-3xl opacity-40"></div>
  <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#C1856D] rounded-full blur-2xl opacity-40"></div>

  <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center relative z-10">
    {/* Left content */}
    <div>
      <span className="inline-block bg-[#9A3F3F] text-[#fef2f2] px-3 py-1 rounded-full text-sm mb-4 font-semibold">
        🎉 Big Sale 50% OFF!
      </span>
      <h1 className="text-4xl md:text-6xl font-bold text-[#9A3F3F] leading-tight">
        Discover <span className="text-[#C1856D]">Unique Gadgets</span> for Your Lifestyle
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-md">
        Shop the latest electronics and accessories with exclusive discounts.
      </p>
      <div className="mt-6 flex gap-4">
        <button className="bg-[#9A3F3F] text-[#fef2f2] px-6 py-3 rounded-lg font-medium hover:bg-[#7d2f2f] transition">
          Shop Now
        </button>
        <button className="border border-[#9A3F3F] text-[#9A3F3F] px-6 py-3 rounded-lg font-medium hover:bg-[#9A3F3F] hover:text-[#fef2f2] transition">
          Explore
        </button>
      </div>
    </div>

    {/* Right image */}
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg"
        alt="Hero Product"
        className="rounded-xl shadow-lg w-full object-cover max-h-[600px]"
      />
      {/* floating decoration */}
      <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#E6CFA9] rounded-full animate-bounce"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#C1856D] rounded-full animate-pulse"></div>
    </div>
  </div>
</section>

  )
}

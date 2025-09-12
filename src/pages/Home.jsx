import React from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import FeaturedCategories from "../components/FeaturedCategories";
import TestimonialsAndBrands from "../components/TestimonialsAndBrands";
import TrustedBrands from "../components/TrustedBrands";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Product listing */}
      <div className="container my-3 p-0">
        <h2 className="mb-3">Featured Products</h2>
        <div
          className="grid gap-6 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3
                    lg:grid-cols-4"
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <FeaturedCategories />
      <TrustedBrands/>
      <TestimonialsAndBrands/>

      {/* Footer */}
      <Footer />
    </div>
  );
}

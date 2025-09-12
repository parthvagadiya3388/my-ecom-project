import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { 
    id: 1, 
    name: "Smartphones", 
    image: "https://cdn.mos.cms.futurecdn.net/kBdPQrJCMuBfmrhK928pWT-1200-80.jpg" 
  },
  { 
    id: 2, 
    name: "Laptops", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" 
  },
  { 
    id: 3, 
    name: "Headphones", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2y8tzyGf3UEUeUttjasYuNnPkMqhIm43EA&s" 
  },
  { 
    id: 4, 
    name: "Cameras", 
    image: "https://www.blogdelfotografo.com/wp-content/uploads/2020/04/camara-de-fotos-ocasion.webp" 
  },
  { 
    id: 5, 
    name: "Smart Watches", 
    image: "https://www.lifewire.com/thmb/mCch-x69IGZzrLp-iTqi5G_PdB4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-492655340-5bd79e4046e0fb00515754d0.jpg" 
  },
  { 
    id: 6, 
    name: "Gaming Consoles", 
    image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2FtaW5nJTIwY29uc29sZXxlbnwwfHwwfHx8MA%3D%3D" 
  },
];


export default function Categories() {
  return (
    <div className="container">
      <h2 className="mb-4 text-center">Shop by Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-4 col-sm-6 mb-4">
            <Link to={`/category/${category.id}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm category-card">
                <img
                  src={category.image}
                  alt={category.name}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

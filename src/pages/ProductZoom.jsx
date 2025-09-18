import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

function ProductZoom({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Normal Image */}
      <img
        src={src}
        alt={alt}
        className="cursor-zoom-in rounded-xl shadow-md"
        onClick={() => setOpen(true)}
        style={{ maxHeight: 520 , width: '100%', height: '100%' ,objectFit: 'cover'}}
      />

      {/* Zoom Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-5 right-5 text-white text-2xl"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-lg cursor-zoom-out"
          />
        </div>
      )}
    </>
  );
}

export default ProductZoom;

import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <>
    <Link to={`/about/${item.id}`} className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">

      {/* Image */}
      <div className="bg-gray-100 flex justify-center items-center h-60 overflow-hidden">
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.name}
          className="h-44 object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-5">

        {/* Category */}
        <p className="text-xs text-gray-400 uppercase">
          {item.category}
        </p>

        {/* Name */}
        <h2 className="text-lg font-semibold mt-1 text-gray-900 line-clamp-2">
          {item.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center mt-2 text-yellow-500 text-sm">
          ⭐ {item.rating}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">

          <span className="text-xl font-bold text-black">
            ${item.price}
          </span>

          <button
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* placeholder for add-to-cart */ }}
          >
            Add
          </button>

        </div>

      </div>
    </Link>
    </>
  );
};

export default ProductCard;
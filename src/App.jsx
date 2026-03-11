import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./config/axios";
import ProductCard from "./components/card";
import Header from "./components/Header";

const App = () => {
  const [product, setproduct] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/products");
      setproduct(res.data.data);
    })();
  }, []);

  return (
    <div className="bg-gray-300 min-h-screen py-10">

      <Header>
        <div className="flex gap-3">
          <Link to="/admin" className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-800 hover:bg-slate-50">Log In</Link>
          <Link to="/admin" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Create</Link>
        </div>
      </Header>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {product.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}

      </div>

    </div>
  );
};

export default App;
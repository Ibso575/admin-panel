import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";
import Header from "./Header";

const ProductAbout = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="flex justify-center items-center">
          <img
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              className="rounded-xl w-full max-h-[400px] object-contain"
            />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              Category: {product.category}
            </p>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-emerald-600">
                ${product.price}
              </span>

              <span className="text-yellow-500 font-medium">
                ⭐ {product.rating}
              </span>
            </div>

            <p className="text-gray-700">
              Stock: <span className="font-semibold">{product.stock}</span>
            </p>
          </div>

          <div className="mt-6 flex gap-3">

            <button
              onClick={() => navigate(`/createproduct?id=${id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Update
            </button>

            <button
              onClick={async () => {
                if (!confirm("Are you sure you want to delete this product?")) return;
                try {
                  await api.delete(`/products/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                  });
                  navigate("/");
                } catch (err) {
                  console.error(err);
                  alert(err?.response?.data?.message || err?.message || "Delete failed");
                }
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Delete
            </button>
          </div>

        </div>

      </div>
    </div>
    </>
  );}

export default ProductAbout;
import { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../components/Header';

const inputClassName =
  "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500";

const initialForm = {
  name: "",
  category: "",
  price: "",
  description: "",
  stock: "",
  rating: "",
};

const CreateProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const [formValues, setFormValues] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = new FormData();
    payload.append("name", formValues.name.trim());
    payload.append("category", formValues.category.trim());
    payload.append("price", formValues.price);
    payload.append("description", formValues.description.trim());
    payload.append("stock", formValues.stock);
    payload.append("rating", formValues.rating);
    if (image) payload.append("image", image);

    try {
      setLoading(true);

      if (editId) {
        // update
        const res = await api.patch(`/products/${editId}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Product updated successfully.");
        navigate(`/about/${editId}`);
      } else {
        // create
        const res = await api.post("/products", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Product created successfully.");
        setFormValues(initialForm);
        setImage(null);
        e.target.reset();
        const newId = res?.data?.data?.id || res?.data?.id;
        if (newId) navigate(`/about/${newId}`);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save product. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!editId) return;
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.get(`/products/${editId}`);
        const p = res?.data?.data;
        if (!p) return;
        if (mounted) {
          setFormValues({
            name: p.name || "",
            category: p.category || "",
            price: p.price || "",
            description: p.description || "",
            stock: p.stock || "",
            rating: p.rating || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    return () => { mounted = false };
  }, [editId]);

  return (
    <>
      <Header title={editId ? 'Edit Product' : 'Create Product'} />
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          {editId ? "Update Product" : "Add New Product"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className={inputClassName}
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Product name"
            required
          />

          <input
            className={inputClassName}
            type="text"
            name="category"
            value={formValues.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className={inputClassName}
              type="number"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              step="0.01"
              required
            />

            <input
              className={inputClassName}
              type="number"
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              placeholder="Stock"
              min="0"
              required
            />

            <input
              className={inputClassName}
              type="number"
              name="rating"
              value={formValues.rating}
              onChange={handleChange}
              placeholder="Rating"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>

          <textarea
            className={inputClassName}
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            required
          />

          <input
            className={inputClassName}
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />

          {error ? (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            {loading ? "Saving..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreateProduct;

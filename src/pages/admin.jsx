import React from 'react';
import api from "../config/axios";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Admin = () => {
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    try {
      const res = await api.post("/auth/login", {
        username: form.get("username"),
        password: form.get("password"),
      });

      localStorage.setItem("token", res.data.data.token);

      api.defaults.headers.Authorization = "Bearer " + res.data.data.token;
      navigate("/createproduct");
    } catch (err) {
      alert("Username yoki password noto‘g‘ri!");
      console.error(err);
    }
  };


  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-white p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Admin Panel</h1>
          <p className="text-sm text-slate-500">Sign in to manage products and orders</p>
        </div>

        <form autoComplete="off" className="space-y-4" action="#" onSubmit={login}>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-sm hover:scale-[1.01] transition-transform"
          >
            Log in
          </button>

          <div className="text-center text-xs text-slate-400 mt-2">
            Forgot password? Contact the system administrator.
          </div>
        </form>
      </div>
    </div>
    </>
  );}

export default Admin;

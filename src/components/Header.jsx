import React from "react";
import { Link } from "react-router-dom";

const Header = ({ title = "Admin Panel", children }) => {
  return (
    <header className="max-w-7xl mx-auto px-6 mb-6 my-[20px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="px-3 py-2  rounded-md bg-blue-400 border hover:text-slate-800 border-slate-200 duration-300 text-white hover:bg-slate-50"
        >
          Home
        </Link>
        <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
      </div>

      <div>{children}</div>
    </header>
  );
};

export default Header;

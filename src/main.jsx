import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductCard from "./components/card.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from "./pages/admin.jsx";
import CreateProduct from "./pages/createproduct.jsx";
import ProductAbout from "./components/about.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
   {
    path: "/createproduct",
    element: <CreateProduct/>,
  },
   {
    path: "/about/:id",
    element: <ProductAbout/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
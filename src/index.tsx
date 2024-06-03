import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import React from "react";
import { getRouter } from "./components/Router";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={getRouter()} />
  </React.StrictMode>
);

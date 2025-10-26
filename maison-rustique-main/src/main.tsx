
import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/globals.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  
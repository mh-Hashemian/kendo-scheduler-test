import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@progress/kendo-theme-default/dist/all.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

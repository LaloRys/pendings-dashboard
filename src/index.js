import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PendingsProvider } from "./context/PendingsContext";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PendingsProvider>
      <Toaster />
      <App />
    </PendingsProvider>
  </React.StrictMode>
);

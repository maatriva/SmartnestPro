import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
   <BrowserRouter>
  <ParallaxProvider>
    <App />
  </ParallaxProvider>
</BrowserRouter>
);
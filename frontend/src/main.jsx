import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "./styles/theme.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";
import {GoogleOAuthProvider} from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <BrowserRouter>
    <ParallaxProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ParallaxProvider>
  </BrowserRouter>
  </GoogleOAuthProvider>
);
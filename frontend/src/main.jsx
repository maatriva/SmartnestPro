import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';

if (typeof document !== "undefined") {
  document.body.style.overflow = "";
}

const rootElement = document.getElementById("root");

const app = (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <HelmetProvider>
      <BrowserRouter>
        <ParallaxProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ParallaxProvider>
      </BrowserRouter>
    </HelmetProvider>
  </GoogleOAuthProvider>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
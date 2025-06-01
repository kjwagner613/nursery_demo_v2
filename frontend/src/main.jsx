import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const rootElement = document.getElementById("root");

// Ensure root is only created once
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
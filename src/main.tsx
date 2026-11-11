import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PasswordGate from "./PasswordGate";
import "./index.css";

// the lanyard and the journey view theme off data-theme (set before first paint)
document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordGate>
      <App />
    </PasswordGate>
  </StrictMode>,
);

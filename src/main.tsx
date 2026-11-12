import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import PasswordGate from "./PasswordGate";
import "./index.css";

// Keep WebGL frames readable so the globe can be captured into PDFs.
const getCtx = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, attrs?: object) {
  if (type === "webgl" || type === "webgl2") attrs = { ...attrs, preserveDrawingBuffer: true };
  return (getCtx as (t: string, a?: object) => RenderingContext | null).call(this, type, attrs);
} as typeof HTMLCanvasElement.prototype.getContext;


// the lanyard and the journey view theme off data-theme (set before first paint)
document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PasswordGate>
      <App />
    </PasswordGate>
  </StrictMode>,
);

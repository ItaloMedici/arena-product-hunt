import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Providers } from "./providers.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers />
  </StrictMode>
);

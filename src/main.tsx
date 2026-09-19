import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CertificationsPage from "./components/CertificationsPage.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

if (window.location.pathname === "/certifications") {
  root.render(
    <StrictMode>
      <CertificationsPage />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import {UserProvider} from "./context/UserContext.jsx"; // ✅ Just import it like this, no variable needed

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <UserProvider>
          <App />
      </UserProvider>

  </StrictMode>,
);

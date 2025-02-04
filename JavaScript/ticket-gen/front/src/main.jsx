import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./contexts/UserContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);


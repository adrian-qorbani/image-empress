import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.scss";
import "./utils/i18n.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// SCSS 스타일 import
import "./styles/reset.scss";
import "./styles/animate.scss";
import "./styles/style.scss";
import "./styles/swiper.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

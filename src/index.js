import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

function LandingPage() {
  // 여기서 외부 정적 페이지로 리다이렉트
  window.location.replace("/promo/");

  return null;
}

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);

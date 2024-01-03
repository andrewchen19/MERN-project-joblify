import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Redux Toolkit
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-center" autoClose={2000} />
    </Provider>
  </React.StrictMode>
);

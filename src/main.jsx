import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./scss/main.scss";
import { OrdersProvider } from "./context/OrdersContext";
import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);

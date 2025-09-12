import React from "react";
import { Table, Button, Form, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrashAlt, FaShoppingBag, FaPlus, FaMinus } from "react-icons/fa";
import "../index.css";

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice } = useCart();

  if (items.length === 0)
    return (
      <div className="cart-empty text-center py-20">
        {/* <FaShoppingBag size={50} className="mb-3 text-muted" /> */}
        <h3 className="mb-3 fw-bold" style={{ color: "#9A3F3F" }}>
          Your cart is empty
        </h3>
        <Link to="/" className="btn btn-theme btn-lg rounded shadow">
          Go Shopping
        </Link>
      </div>
    );

  return (
    <div className="cart-page container">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#9A3F3F" }}>
        🛒 Your Shopping Cart
      </h2>

      <div className="row g-4">
        {/* Left: Cart Items */}
        <div className="col-lg-8">
          <div className="glass-card shadow rounded-4 p-3">
            <Table responsive borderless hover className="cart-table align-middle">
              <thead>
                <tr style={{ backgroundColor: "#E6CFA9" }}>
                  <th>Product</th>
                  <th style={{ width: 180 }}>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={it.image || "https://via.placeholder.com/60"}
                          rounded
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          }}
                        />
                        <span className="fw-semibold">{it.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2 cart-qty-box">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => updateQty(it.id, Math.max(1, it.quantity - 1))}
                          className="qty-btn"
                        >
                          <FaMinus />
                        </Button>
                        <Form.Control
                          type="number"
                          min={1}
                          value={it.quantity}
                          className="cart-qty text-center"
                          style={{ maxWidth: 60 }}
                          onChange={(e) => updateQty(it.id, Number(e.target.value))}
                        />
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => updateQty(it.id, it.quantity + 1)}
                          className="qty-btn"
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </td>
                    <td>₹{it.price}</td>
                    <td>
                      <strong style={{ color: "#9A3F3F" }}>
                        ₹{it.price * it.quantity}
                      </strong>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-circle p-2"
                        onClick={() => removeFromCart(it.id)}
                      >
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="col-lg-4">
          <Card className="shadow-lg border-0 sticky-top summary-card rounded-4">
            <Card.Body>
              <h4 className="fw-bold mb-4" style={{ color: "#C1856D" }}>
                Order Summary
              </h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span style={{ color: "#9A3F3F" }}>₹{totalPrice}</span>
              </div>
              <Button
                as={Link}
                to="/checkout"
                className="btn-theme btn-lg w-100 rounded shadow"
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

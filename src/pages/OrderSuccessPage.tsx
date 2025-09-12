import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function OrderSuccessPage() {
  const { width, height } = useWindowSize();
  const location = useLocation();
  const orderId = location.state?.orderId || localStorage.getItem('orderId');
  const navigate = useNavigate();

  const handleHome = () => {
    window.location.href = '/';
  }

  const handleCart = () => {
    navigate('/orders');
  }

  return (
    <div className="order-success-page">
      {/* 🎉 Confetti Effect */}
      <Confetti width={width} height={height} numberOfPieces={200} />

      <Container>
        <Card className="success-card">
          <div className="success-emoji">🎉</div>
          <h2 className="success-title">Thank You for Your Order!</h2>
          <p className="success-message">Your order has been placed successfully.</p>

          <h5 className="order-id">
            <span className="order-id-label">Order ID:</span>{" "}
            <strong className="order-id-value">{orderId}</strong>
          </h5>

          <div className="success-buttons">
            <Button onClick={handleHome} className="continue-shopping-btn">
              Continue Shopping
            </Button>
            <Button onClick={handleCart} className="view-orders-btn">
              View Orders
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
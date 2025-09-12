import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <div>Product not found</div>;

  return (
    <Row>
      <Col md={6}>
        <Image src={product.image} fluid />
      </Col>
      <Col md={6}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h4>₹{product.price}</h4>
        <Form.Select
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ width: 120 }}
        >
          {[...Array(Math.min(product.stock, 10)).keys()].map((i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Form.Select>
        <div className="mt-3">
          <Button onClick={() => addToCart(product, qty)} variant="danger">
            Add to cart
          </Button>
        </div>
      </Col>
    </Row>
  );
}

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import products from "../data/products";


export default function Sale() {
  return (
    <div className="sale-page">
      {/* Hero Banner */}
      <div className="sale-banner text-center text-white py-5 mb-4" style={{
        background: "linear-gradient(90deg, #9A3F3F, #C1856D)",
      }}>
        <h1 className="fw-bold">Mega Sale is Live!</h1>
        <p className="lead">Grab up to 50% off on top electronics</p>
      </div>

      {/* Sale Products Grid */}
      <Container>
        <h2 className="text-center mb-4">Sale Products</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

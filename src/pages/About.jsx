import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaShippingFast, FaHeadset, FaAward, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div
        className="about-hero position-relative d-flex align-items-center"
        style={{
          height: "50vh",
          background: "linear-gradient(135deg, #9A3F3F, #C1856D)",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
          <div
            className="position-absolute rounded-circle"
            style={{
              width: "250px",
              height: "250px",
              background: "rgba(230, 207, 169, 0.25)", // accent blob
              top: "15%",
              left: "-80px",
              filter: "blur(60px)",
              animation: "pulse 6s infinite",
            }}
          ></div>
          <div
            className="position-absolute rounded-circle"
            style={{
              width: "300px",
              height: "300px",
              background: "rgba(255, 255, 255, 0.1)", // soft blob
              bottom: "-100px",
              right: "-100px",
              filter: "blur(80px)",
              animation: "pulse 8s infinite alternate",
            }}
          ></div>
        </div>

        <div className="container position-relative text-white">
          <div className="row align-items-center">
            {/* Text Section */}
            <div className="col-md-6">
              <h1 className="fw-bold display-4 mb-3">
                About <span style={{ color: "#E6CFA9" }}>FashionHub</span>
              </h1>
              <p className="lead">
                Redefining electronic shopping with premium products & trusted brands.  
                We combine fashion, technology, and lifestyle to bring you the best.
              </p>
              <button
                className="btn px-4 py-2 mt-3 fw-bold rounded-pill shadow-sm"
                style={{
                  backgroundColor: "#E6CFA9",
                  color: "#9A3F3F",
                  border: "none",
                }}
              >
                Explore More
              </button>
            </div>

            {/* Image Section */}
            <div className="col-md-6 text-center position-absolute right-0 d-none d-md-block" style={{ left: "68%"}}>
              <img
              src="/src/images/3.png"
                alt="About Illustration"
                className="img-fluid"
                style={{
                  maxHeight: "450px",
                  animation: "float 4s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Container className="py-5">
        {/* Story Section */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <img
              src="https://goldenwestpackaging.com/wp/wp-content/uploads/2023/01/GoldenWestPackaging-186347-Packaging-eCommerce-Business-Image1.jpg"
              alt="Our Story"
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col md={6}>
            <h2 className="fw-bold mb-3">Our Story</h2>
            <p className="text-muted">
              At <strong>FashionHub</strong>, we believe shopping should be
              simple, reliable, and enjoyable. From premium electronics to
              everyday essentials, we bring the best deals straight to your
              doorstep. Our mission is to deliver quality products with fast
              shipping and excellent customer support.
            </p>
          </Col>
        </Row>

        {/* Why Choose Us */}
        <h2 className="fw-bold text-center mb-4">Why Choose Us?</h2>
        <Row className="mb-5">
          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <FaShippingFast size={40} className="mb-3 text-danger" />
              <h5>Fast Delivery</h5>
              <p className="text-muted">Quick & reliable shipping worldwide.</p>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <FaHeadset size={40} className="mb-3 text-danger" />
              <h5>24/7 Support</h5>
              <p className="text-muted">Always here to help you anytime.</p>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <FaAward size={40} className="mb-3 text-danger" />
              <h5>Premium Quality</h5>
              <p className="text-muted">Trusted products from top brands.</p>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <Card className="text-center p-4 shadow-sm h-100">
              <FaUsers size={40} className="mb-3 text-danger" />
              <h5>Happy Customers</h5>
              <p className="text-muted">Thousands of satisfied buyers.</p>
            </Card>
          </Col>
        </Row>

        {/* Stats / Numbers */}
        <Row className="text-center">
          <Col md={3} sm={6} className="mb-4">
            <h2 className="fw-bold text-danger">10K+</h2>
            <p>Products Delivered</p>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h2 className="fw-bold text-danger">5K+</h2>
            <p>Happy Customers</p>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h2 className="fw-bold text-danger">15+</h2>
            <p>Partner Brands</p>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h2 className="fw-bold text-danger">24/7</h2>
            <p>Customer Support</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React, { useState } from "react";
import { Navbar, Nav, Container, Badge, NavDropdown, Form } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "../index.css";

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="custom-navbar shadow-sm" fixed="top">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="brand">
          <span className="brand-main">FashionHub</span>
          <span className="brand-tagline">Premium Shopping</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav Links */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories">
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sale">
              Sale
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
          </Nav>

          {/* Right side actions */}
          <div className="d-flex align-items-center nav-actions">
            {/* Search */}
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <div className="search-box">
                <FaSearch className="search-icon" onClick={handleSearch} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </Form>

            {/* wishlist */}
            <Nav.Link as={NavLink} to="/wishlist" className="nav-icon wishlist-icon">
              <FaUser />
            </Nav.Link>

            {/* Cart */}
            <Nav.Link as={NavLink} to="/cart" className="nav-icon cart-icon">
              <FaShoppingCart />
              {totalItems > 0 && (
                <Badge bg="danger" className="cart-badge">
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {/* Account Dropdown */}
            <NavDropdown
              title={<FaUser />}
              id="account-dropdown"
              align="end"
              className="nav-icon"
            >
              <NavDropdown.Item as={NavLink} to="/account">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/orders">
                My Orders
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/wishlist">
                Wishlist
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

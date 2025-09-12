import React from "react";
import { Form, Button, Card, Nav } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../index.css";
import { useOrders } from "../context/OrdersContext";

// ✅ Validation Schema
const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().required("ZIP Code is required"),
  country: Yup.string().required("Country is required"),
});

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

    const handlePlaceOrder = (values) => {
    const orderId = "ORD" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split("T")[0],
      amount: totalPrice,
      status: "Confirmed", // new order is confirmed
      items: items.map((it) => it.name),
      customer: values,
    };
    localStorage.setItem('orderId', orderId); // Store orderId in localStorage

    addOrder(newOrder); // ✅ Now this works
    clearCart();
    navigate("/order-success"); // navigate to orders page
  };

  return (
    <div className="checkout-page container py-5">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          address: "",
          city: "",
          zip: "",
          country: "",
        }}
        validationSchema={CheckoutSchema}
        onSubmit={(values) => handlePlaceOrder(values)}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <div className="row">
              {/* LEFT SIDE FORM */}
              <div className="col-lg-8 mb-4">
                <Card className="shadow-sm p-4">
                  <h4 style={{ color: "#9A3F3F" }} className="mb-4">
                    Checkout Details
                  </h4>

                  {/* ✅ Tabs for Billing / Shipping */}
                  <Nav variant="tabs" defaultActiveKey="billing" className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="billing">Billing Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="shipping">Shipping Details</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <Field name="fullName" className="form-control" />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <Field as="textarea" name="address" className="form-control" />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>
                      <Field name="city" className="form-control" />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">ZIP Code</label>
                      <Field name="zip" className="form-control" />
                      <ErrorMessage
                        name="zip"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <Field name="country" className="form-control" />
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-danger small"
                    />
                  </div>
                </Card>
              </div>

              {/* RIGHT SIDE ORDER SUMMARY */}
              <div className="col-lg-4">
                <Card className="shadow-sm p-4 sticky-summary">
                  <h5 style={{ color: "#9A3F3F" }}>Order Summary</h5>
                  <ul className="list-unstyled mt-3">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="d-flex justify-content-between mb-2 border-bottom pb-2"
                      >
                        <span>
                          {it.name} x {it.quantity}
                        </span>
                        <strong>₹{it.price * it.quantity}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between mt-3 mb-4">
                    <h5>Total:</h5>
                    <h5 style={{ color: "#C1856D" }}>₹{totalPrice}</h5>
                  </div>

                  {/* ✅ FIXED BUTTON inside FormikForm */}
                  <Button
                    type="submit"
                    className="btn-theme w-100"
                    disabled={isSubmitting}
                  >
                    Place Order
                  </Button>
                </Card>
              </div>
            </div>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}

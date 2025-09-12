import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useOrders } from "../context/OrdersContext";

export default function OrdersPage() {
  const { orders } = useOrders();
  const confirmedOrders = orders.filter(o => o.status === "Confirmed");

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefaf7] to-[#fffdfb] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-4xl font-extrabold text-[#9A3F3F] mb-8 text-center">
          My Orders
        </h2>

        {confirmedOrders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No confirmed orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
              <thead className="bg-[#f8f0ed]">
                <tr className="text-[#9A3F3F] text-left text-lg font-semibold">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {confirmedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-b-0 hover:bg-[#fff2ef] transition-all duration-300"
                  >
                    <td className="p-4 font-medium text-[#9A3F3F]">{order.id}</td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4 text-gray-700">{order.items.join(", ")}</td>
                    <td className="p-4 text-gray-800 font-semibold">₹{order.amount}</td>
                    <td className="p-4 font-semibold text-green-600">{order.status}</td>
                    <td className="p-4 text-center">
                      <Button
                        size="sm"
                        className="bg-[#9A3F3F] hover:bg-[#C1856D] text-white font-medium px-4 py-2 rounded-full shadow-md transition-all duration-200"
                        onClick={() => handleOpenModal(order)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="rounded-3xl"
      >
        <Modal.Header closeButton className="bg-[#f8f0ed]">
          <Modal.Title className="text-[#9A3F3F] font-bold text-xl">Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-gray-700 space-y-3">
          {selectedOrder && (
            <>
              <div className="p-4 bg-[#fff2ef] rounded-xl shadow-sm">
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Date:</strong> {selectedOrder.date}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Amount:</strong> ₹{selectedOrder.amount}</p>
                <p><strong>Items:</strong> {selectedOrder.items.join(", ")}</p>
              </div>
              {selectedOrder.customer && (
                <div className="p-4 bg-[#fff2ef] rounded-xl shadow-sm">
                  <p><strong>Customer Name:</strong> {selectedOrder.customer.fullName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.zip}, {selectedOrder.customer.country}</p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-t-0">
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-full px-6 py-2 transition-all duration-200"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

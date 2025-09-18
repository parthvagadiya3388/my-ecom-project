import React, { useState } from "react";
import {
  FaUser,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaCog,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

export default function Account() {
  const theme = {
    main: "#9A3F3F",
    accent: "#C1856D",
    light: "#E6CFA9",
    bg: "#fef2f2",
  };

  const [user, setUser] = useState({
    name: "Parth Vagadiya",
    email: "parth@example.com",
    phone: "+91 98765 43210",
    address: "Surat, Gujarat, India",
    avatar: "https://i.pravatar.cc/300?img=12",
  });

  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        background: `linear-gradient(135deg, ${theme.bg} 0%, #fff 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="col-span-1">
          <div
            className="rounded-2xl shadow-xl backdrop-blur-lg border border-white/20 overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${theme.main} 0%, ${theme.accent} 100%)`,
            }}
          >
            <div className="p-6 text-center text-white">
              <div className="mx-auto w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
              <p className="text-sm opacity-90">{user.email}</p>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white transition"
              >
                <FaEdit /> Edit
              </button>
            </div>

            {/* nav */}
            <div className="bg-white/10 p-4">
              <nav className="space-y-2">
                {[
                  { id: "dashboard", icon: <FaUser />, label: "Dashboard" },
                  { id: "orders", icon: <FaBoxOpen />, label: "Orders" },
                  { id: "wishlist", icon: <FaHeart />, label: "Wishlist" },
                  { id: "address", icon: <FaMapMarkerAlt />, label: "Addresses" },
                  { id: "settings", icon: <FaCog />, label: "Settings" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-white/30 shadow-md scale-105"
                        : "hover:bg-white/20"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}

                <button
                  onClick={() => alert("Logged out (demo)")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/20 mt-4 text-red-100"
                >
                  <FaSignOutAlt /> <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-1 md:col-span-3">
          <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
            {/* Header */}
            <div
              className="p-6 flex flex-col md:flex-row md:items-center md:justify-between"
              style={{
                background: `linear-gradient(90deg, ${theme.light} 0%, rgba(255,255,255,0.85) 100%)`,
              }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Hello, <span style={{ color: theme.main }}>{user.name.split(" ")[0]}</span>
                </h2>
                <p className="text-gray-600 mt-1">
                  Welcome back! Manage your profile, orders & settings here.
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="text-sm text-gray-500">Full name</div>
                    <div className="font-medium text-gray-800">{user.name}</div>
                  </div>
                  <div className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-800">{user.email}</div>
                  </div>
                  <div className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-800">{user.phone}</div>
                  </div>
                  <div className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="font-medium text-gray-800">{user.address}</div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Recent Orders
                  </h3>
                  {[1, 2].map((o) => (
                    <div
                      key={o}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition"
                    >
                      <div>
                        <div className="font-semibold">ORD-100{o}</div>
                        <div className="text-sm text-gray-500">
                          {o} item • Sep 15, 2025
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#9A3F3F]">₹{o * 999}</div>
                        <div
                          className={`text-sm ${
                            o === 1 ? "text-yellow-600" : "text-green-600"
                          }`}
                        >
                          {o === 1 ? "Processing" : "Delivered"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-3 hover:shadow-md transition"
                    >
                      <div className="h-36 bg-gray-100 rounded-md mb-3" />
                      <div className="font-medium">Product {i}</div>
                      <div className="text-sm text-[#C1856D]">₹{i * 1000}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "address" && (
                <div className="p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-semibold">Home</div>
                  <div className="text-sm text-gray-600">{user.address}</div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="p-4 border rounded-lg flex items-center justify-between hover:shadow-md transition">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-500">
                      Receive order updates via email
                    </div>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="p-3 border rounded-md"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-[#9A3F3F] text-white"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

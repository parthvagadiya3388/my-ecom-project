import React, { useState } from "react";
import { FaUser, FaBoxOpen, FaHeart, FaMapMarkerAlt, FaCog, FaSignOutAlt, FaEdit } from "react-icons/fa";

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
    <div className="min-h-screen p-6 md:p-10" style={{ background: `linear-gradient(180deg, ${theme.bg} 0%, #fff 100%)` }}>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="col-span-1">
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{
                background: `linear-gradient(180deg, ${theme.main} 0%, ${theme.accent} 100%)`,
              }}
            >
              <div className="p-6 text-center text-white">
                <div className="mx-auto w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden">
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                <p className="text-sm opacity-90">{user.email}</p>

                <div className="mt-4 flex gap-2 justify-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white transition"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              </div>

              {/* nav */}
              <div className="bg-white/10 p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition ${activeTab === "dashboard" ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    <FaUser /> <span className="font-medium">Dashboard</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition ${activeTab === "orders" ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    <FaBoxOpen /> <span className="font-medium">Orders</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition ${activeTab === "wishlist" ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    <FaHeart /> <span className="font-medium">Wishlist</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("address")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition ${activeTab === "address" ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    <FaMapMarkerAlt /> <span className="font-medium">Addresses</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition ${activeTab === "settings" ? "bg-white/20" : "hover:bg-white/10"}`}
                  >
                    <FaCog /> <span className="font-medium">Settings</span>
                  </button>

                  <button
                    onClick={() => alert("Logged out (demo)")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white transition hover:bg-white/10 mt-2 text-red-100"
                  >
                    <FaSignOutAlt /> <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="col-span-1 md:col-span-3">
            {/* header card with gradient accent + quick stats */}
            <div className="rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between" style={{ background: `linear-gradient(90deg, ${theme.light} 0%, rgba(255,255,255,0.85) 100%)` }}>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Hello, <span style={{ color: theme.main }}>{user.name.split(" ")[0]}</span></h2>
                  <p className="text-gray-600 mt-1">Welcome back! Review your account details and recent activity.</p>
                </div>

                <div className="mt-4 md:mt-0 flex gap-4">
                  <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-center">
                    <div className="text-sm text-gray-500">Orders</div>
                    <div className="text-xl font-semibold" style={{ color: theme.main }}>12</div>
                  </div>

                  <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-center">
                    <div className="text-sm text-gray-500">Wishlist</div>
                    <div className="text-xl font-semibold" style={{ color: theme.main }}>3</div>
                  </div>

                  <div className="bg-white rounded-lg px-4 py-3 shadow-sm text-center">
                    <div className="text-sm text-gray-500">Member since</div>
                    <div className="text-xl font-semibold" style={{ color: theme.main }}>2023</div>
                  </div>
                </div>
              </div>

              {/* content body */}
              <div className="p-6 bg-white">
                {/* conditional render by activeTab */}
                {activeTab === "dashboard" && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500">Full name</div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium text-gray-800">{user.email}</div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-gray-800">{user.phone}</div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-gray-500">Address</div>
                        <div className="font-medium text-gray-800">{user.address}</div>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "orders" && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                      {/* demo orders — replace with real data */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">ORD-1023</div>
                          <div className="text-sm text-gray-500">2 items • Sep 10, 2025</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold" style={{ color: theme.main }}>₹3,999</div>
                          <div className="text-sm text-yellow-600">Processing</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-semibold">ORD-1008</div>
                          <div className="text-sm text-gray-500">1 item • Aug 25, 2025</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold" style={{ color: theme.main }}>₹1,499</div>
                          <div className="text-sm text-green-600">Delivered</div>
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <button className="px-4 py-2 rounded-full border hover:bg-gray-50">View all orders</button>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "wishlist" && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Wishlist</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* small product cards — demo */}
                      <div className="border rounded-lg p-3">
                        <div className="h-36 bg-gray-100 rounded-md mb-3" />
                        <div className="font-medium">Wireless Headphones</div>
                        <div className="text-sm" style={{ color: theme.accent }}>₹1,999</div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <div className="h-36 bg-gray-100 rounded-md mb-3" />
                        <div className="font-medium">Portable Charger</div>
                        <div className="text-sm" style={{ color: theme.accent }}>₹499</div>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "address" && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Saved Addresses</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="font-semibold">Home</div>
                        <div className="text-sm text-gray-600">{user.address}</div>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "settings" && (
                  <section>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h3>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div>
                          <div className="font-medium">Email Notifications</div>
                          <div className="text-sm text-gray-500">Receive order updates via email</div>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#9A3F3F] peer-focus:ring-2 peer-focus:ring-[#C1856D] transition"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input name="name" value={formData.name} onChange={handleChange} className="p-3 border rounded-md" />
              <input name="email" value={formData.email} onChange={handleChange} className="p-3 border rounded-md" />
              <input name="phone" value={formData.phone} onChange={handleChange} className="p-3 border rounded-md" />
              <input name="address" value={formData.address} onChange={handleChange} className="p-3 border rounded-md" />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md border">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-md bg-[#9A3F3F] text-white">Save changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

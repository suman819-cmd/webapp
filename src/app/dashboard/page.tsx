// // src/app/dashboard/page.tsx
// "use client";

// import React, { useMemo, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// // import Image from "next/image";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   // Legend,
// } from "recharts";

// /**
//  * Single-file Owner/Admin Dashboard
//  * Drop into: /app/dashboard/page.tsx
//  * Dependencies: recharts, tailwindcss
//  */

// /* -----------------------
//    Types
//    ----------------------- */
// type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
// type PaymentMethod = "ESEWA" | "KHALTI" | "FONEPAY" | "CASH";

// type MenuItem = {
//   id: string;
//   name: string;
//   description?: string;
//   price: number;
//   category: "COFFEE" | "TEA" | "FOOD";
//   available: boolean;
//   imageUrl?: string;
// };

// type Customer = {
//   id: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   createdAt: string;
// };

// type OrderItem = { itemId: string; name: string; qty: number; price: number };
// type Order = {
//   id: string;
//   customerId: string;
//   items: OrderItem[];
//   total: number;
//   status: OrderStatus;
//   paymentMethod: PaymentMethod;
//   createdAt: string;
//   updatedAt: string;
//   notes?: string;
// };

// type Payment = {
//   id: string;
//   orderId: string;
//   method: PaymentMethod;
//   amount: number;
//   status: "PAID" | "REFUNDED" | "FAILED";
//   createdAt: string;
// };

// /* -----------------------
//    Dummy data
//    ----------------------- */
// const initialMenu: MenuItem[] = [
//   {
//     id: "m1",
//     name: "Americano",
//     description: "Espresso + hot water",
//     price: 180,
//     category: "COFFEE",
//     available: true,
//     imageUrl:
//       "https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "m2",
//     name: "Cappuccino",
//     description: "Espresso + steamed milk",
//     price: 220,
//     category: "COFFEE",
//     available: true,
//     imageUrl:
//       "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "m3",
//     name: "Masala Tea",
//     description: "Spiced milk tea",
//     price: 150,
//     category: "TEA",
//     available: false,
//     imageUrl:
//       "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop",
//   },
//   {
//     id: "m4",
//     name: "Blueberry Muffin",
//     description: "Freshly baked muffin",
//     price: 160,
//     category: "FOOD",
//     available: true,
//     imageUrl:
//       "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
//   },
// ];

// const initialCustomers: Customer[] = [
//   {
//     id: "c1",
//     name: "Aarav Shrestha",
//     email: "aarav@example.com",
//     phone: "+977-9812345678",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(),
//   },
//   {
//     id: "c2",
//     name: "Sita Rai",
//     email: "sita@example.com",
//     phone: "+977-9800000000",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
//   },
//   {
//     id: "c3",
//     name: "Nirajan Lama",
//     email: "nirajan@example.com",
//     phone: "+977-9811111111",
//     createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
//   },
// ];

// const rnd = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
// const paymentMethods: PaymentMethod[] = ["ESEWA", "KHALTI", "FONEPAY", "CASH"];
// const orderStatuses: OrderStatus[] = [
//   "PENDING",
//   "PROCESSING",
//   "COMPLETED",
//   "CANCELLED",
// ];

// const initialOrders: Order[] = Array.from({ length: 18 }).map((_, i) => {
//   const created = new Date(Date.now() - 1000 * 60 * 60 * 12 * i);
//   const items = [rnd(initialMenu), rnd(initialMenu)]
//     .filter(Boolean)
//     .map((m) => ({
//       itemId: (m as MenuItem).id,
//       name: (m as MenuItem).name,
//       qty: Math.ceil(Math.random() * 2),
//       price: (m as MenuItem).price,
//     }));
//   const total = items.reduce((a, b) => a + b.price * b.qty, 0);
//   const status = rnd(orderStatuses);
//   const method = rnd(paymentMethods);
//   const cust = rnd(initialCustomers);
//   return {
//     id: `O${1000 + i}`,
//     customerId: cust.id,
//     items,
//     total,
//     status,
//     paymentMethod: method,
//     createdAt: created.toISOString(),
//     updatedAt: created.toISOString(),
//     notes: Math.random() > 0.8 ? "No sugar, extra hot." : undefined,
//   } as Order;
// });

// const initialPayments: Payment[] = initialOrders.map((o, i) => ({
//   id: `P${2000 + i}`,
//   orderId: o.id,
//   method: o.paymentMethod,
//   amount: o.total,
//   status: o.status === "COMPLETED" ? "PAID" : Math.random() > 0.9 ? "FAILED" : "PAID",
//   createdAt: o.createdAt,
// }));

// /* -----------------------
//    Helpers & little UI bits
//    ----------------------- */
// const currency = (n: number) => `₨ ${n.toLocaleString("en-NP")}`;
// const fmtDate = (d: string) => new Date(d).toLocaleString();

// function classNames(...arr: Array<string | false | null | undefined>) {
//   return arr.filter(Boolean).join(" ");
// }

// function Badge({ children, color = "gray" }: { children: React.ReactNode; color?: string }) {
//   const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset";
//   const map: Record<string, string> = {
//     gray: "bg-gray-100 text-gray-800 ring-gray-200",
//     emerald: "bg-emerald-100 text-emerald-800 ring-emerald-200",
//     amber: "bg-amber-100 text-amber-800 ring-amber-200",
//     blue: "bg-blue-100 text-blue-800 ring-blue-200",
//     red: "bg-rose-100 text-rose-800 ring-rose-200",
//     violet: "bg-violet-100 text-violet-800 ring-violet-200",
//   };
//   return <span className={`${base} ${map[color] ?? map.gray}`}>{children}</span>;
// }

// /* -----------------------
//    Modal
//    ----------------------- */
// function Modal({
//   open,
//   onClose,
//   title,
//   children,
// }: {
//   open: boolean;
//   onClose: () => void;
//   title?: string;
//   children: React.ReactNode;
// }) {
//   if (!open) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
//       <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">{title && <h3 className="mb-3 text-lg font-semibold">{title}</h3>}
//         {children}
//       </div>
//     </div>
//   );
// }

// /* -----------------------
//    Export CSV helper
//    ----------------------- */
// function exportCSV<T extends object>(arr: T[], filename = "export.csv") {
//   if (!arr || arr.length === 0) {
//     alert("No rows to export");
//     return;
//   }
//   const headers = Object.keys(arr[0]);
//   const lines = arr.map((r) => headers.map((h) => `"${String((r as Record<string, unknown>)[h] ?? "").replace(/"/g, '""')}"`).join(","));
//   const csv = [headers.join(","), ...lines].join("\n");
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// /* -----------------------
//    Logout Button Component
//    ----------------------- */
// function LogoutButton() {
//   const router = useRouter();

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       router.push("/adminlogin");
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="
//         rounded-lg 
//         px-4 
//         py-2 
//         bg-gray-100 
//         text-gray-800 
//         hover:bg-gray-200 
//         transition-colors 
//         duration-200 
//         focus:outline-none 
//         focus:ring-2 
//         focus:ring-gray-300
//       "
//     >
//       Logout
//     </button>
//   );
// }

// /* -----------------------
//    Main Page Component
//    ----------------------- */
// // ... existing code ...

// export default function DashboardPage() {
//   const [tab, setTab] = useState<
//     "Dashboard" | "Orders" | "Menu" | "Payments" | "Customers" | "Analytics" | "Settings"
//   >("Dashboard");

//   // data states
//   const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
//   const [customers] = useState<Customer[]>(initialCustomers);
//   const [orders, setOrders] = useState<Order[]>(initialOrders);
//   const [payments, setPayments] = useState<Payment[]>(initialPayments);

//   // UI states
//   const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
//   const [search, setSearch] = useState("");
//   const [openOrderId, setOpenOrderId] = useState<string | null>(null);
//   const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
//   const [menuModalOpen, setMenuModalOpen] = useState(false);

//   const openOrder = orders.find((o) => o.id === openOrderId) ?? null;

//   // MOVE getWeekNum FUNCTION HERE (ABOVE where it's used)
//   const getWeekNum = useCallback((d: Date) => {
//     const onejan = new Date(d.getFullYear(), 0, 1);
//     return Math.ceil((((+d - +onejan) / 86400000) + onejan.getDay() + 1) / 7);
//   }, []);

//   // derived: totals
//   const today = new Date();
//   const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//   const totals = useMemo(() => {
//     const sumFrom = (from: Date) =>
//       payments.filter((p) => new Date(p.createdAt) >= from && p.status === "PAID").reduce((a, b) => a + b.amount, 0);
//     const startOfWeek = new Date(startOfDay);
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
//     const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//     return {
//       day: sumFrom(startOfDay),
//       week: sumFrom(startOfWeek),
//       month: sumFrom(startOfMonth),
//     };
//   }, [payments, startOfDay, today]);

//   // charts data
//   const ordersPerDay = useMemo(() => {
//     // last 14 days
//     const map = new Map<string, number>();
//     for (let i = 13; i >= 0; i--) {
//       const d = new Date(startOfDay);
//       d.setDate(d.getDate() - i);
//       const key = `${d.getMonth() + 1}/${d.getDate()}`;
//       map.set(key, 0);
//     }
//     orders.forEach((o) => {
//       const d = new Date(o.createdAt);
//       const key = `${d.getMonth() + 1}/${d.getDate()}`;
//       if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
//     });
//     return Array.from(map.entries()).map(([day, count]) => ({ day, count }));
//   }, [orders, startOfDay]);

//   const revenuePerWeek = useMemo(() => {
//     // simple weekly buckets (last 8 weeks) by number index
//     const w = 8;
//     const result: { week: string; revenue: number }[] = [];
//     for (let i = w - 1; i >= 0; i--) {
//       const start = new Date();
//       start.setDate(start.getDate() - i * 7);
//       const key = `W${getWeekNum(start)}`;
//       result.push({ week: key, revenue: 0 });
//     }
//     payments.forEach((p) => {
//       const idx = result.findIndex((r) => r.week === `W${getWeekNum(new Date(p.createdAt))}`);
//       if (idx >= 0 && p.status === "PAID") result[idx].revenue += p.amount;
//     });
//     return result;
//   }, [payments, getWeekNum]); // Add getWeekNum to dependencies

//   const topSelling = useMemo(() => {
//     const map = new Map<string, number>();
//     orders.forEach((o) => o.items.forEach((it) => map.set(it.name, (map.get(it.name) || 0) + it.qty)));
//     return Array.from(map.entries())
//       .map(([name, qty]) => ({ name, qty }))
//       .sort((a, b) => b.qty - a.qty)
//       .slice(0, 6);
//   }, [orders]);

//   // REMOVE the duplicate getWeekNum definition that was here
//   const findCustomerName = useCallback((id: string) => {
//     return customers.find((c) => c.id === id)?.name ?? "—";
//   }, [customers]);

//   // ... rest of the code remains the same ...

//   // filtered orders for Orders view
//   const filteredOrders = useMemo(() => {
//     return orders
//       .filter((o) => (statusFilter === "ALL" ? true : o.status === statusFilter))
//       .filter((o) => (search ? o.id.toLowerCase().includes(search.toLowerCase()) || findCustomerName(o.customerId).toLowerCase().includes(search.toLowerCase()) : true))
//       .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
//   }, [orders, statusFilter, search, findCustomerName]);

//   function updateOrderStatus(id: string, status: OrderStatus) {
//     setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)));
//     // keep payments consistent in demo
//     setPayments((prev) => prev.map((p) => (p.orderId === id ? { ...p, status: status === "COMPLETED" ? "PAID" : p.status } : p)));
//   }

//   function deleteOrder(id: string) {
//     if (!confirm("Delete this order? This will remove it from the demo data.")) return;
//     setOrders((prev) => prev.filter((o) => o.id !== id));
//     setPayments((prev) => prev.filter((p) => p.orderId !== id));
//     setOpenOrderId(null);
//   }

//   function upsertMenu(item: MenuItem) {
//     setMenu((prev) => (prev.some((m) => m.id === item.id) ? prev.map((m) => (m.id === item.id ? item : m)) : [item, ...prev]));
//   }

//   function deleteMenu(id: string) {
//     if (!confirm("Delete this menu item?")) return;
//     setMenu((prev) => prev.filter((m) => m.id !== id));
//   }

//   /* -----------------------
//      Render pieces
//      ----------------------- */

//   function Sidebar() {
//     const tabs = ["Dashboard", "Orders", "Menu", "Payments", "Customers", "Analytics", "Settings"] as const;
//     return (
//       <aside className="hidden md:flex md:w-72 lg:w-80 flex-col gap-4 rounded-2xl border bg-white p-4 shadow">
//         <div className="flex items-center gap-3 px-2">
//           <div className="h-10 w-10 rounded-xl bg-amber-500/90 text-white flex items-center justify-center font-bold">☕</div>
//           <div>
//             <div className="text-sm font-semibold">Owner Console</div>
//             <div className="text-xs text-gray-500">Coffee Shop Admin</div>
//           </div>
//         </div>

//         <nav className="flex flex-col gap-1 px-2">
//           {tabs.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={classNames(
//                 "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
//                 tab === t ? "bg-black text-white shadow-sm" : "hover:bg-gray-50 text-gray-700"
//               )}
//             >
//               <span className="h-4 w-4 text-sm">{iconFor(t)}</span>
//               {t}
//             </button>
//           ))}
//         </nav>

//         <div className="mt-auto flex flex-col gap-3 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
//           <div className="flex items-center justify-between">
//             <span>Logged in: Owner</span>
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>
//     );
//   }

//   function iconFor(t: string) {
//     switch (t) {
//       case "Dashboard":
//         return "🏠";
//       case "Orders":
//         return "📦";
//       case "Menu":
//         return "☕";
//       case "Payments":
//         return "💳";
//       case "Customers":
//         return "👥";
//       case "Analytics":
//         return "📈";
//       case "Settings":
//         return "⚙️";
//       default:
//         return "•";
//     }
//   }

//   /* -----------------------
//      Main Views
//      ----------------------- */

//   function DashboardView() {
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Today's Revenue</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.day)}</div>
//             <div className="mt-1 text-xs text-gray-400">Payments received today</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">This Week</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.week)}</div>
//             <div className="mt-1 text-xs text-gray-400">Revenue this week</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">This Month</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.month)}</div>
//             <div className="mt-1 text-xs text-gray-400">Revenue this month</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Pending Orders</div>
//             <div className="mt-2 text-2xl font-semibold">{orders.filter((o) => o.status === "PENDING").length}</div>
//             <div className="mt-1 text-xs text-gray-400">Orders pending preparation</div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           <div className="col-span-2 rounded-2xl border bg-white p-4 shadow-sm">
//             <div className="mb-3 flex items-center justify-between">
//               <div className="text-sm font-semibold">Orders (last 14 days)</div>
//               <div className="text-xs text-gray-500">Auto-updating</div>
//             </div>
//             <div style={{ height: 220 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={ordersPerDay}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#111827" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="rounded-2xl border bg-white p-4 shadow-sm">
//             <div className="mb-3 flex items-center justify-between">
//               <div className="text-sm font-semibold">Revenue (last 8 weeks)</div>
//               <div className="text-xs text-gray-500">Breakdown</div>
//             </div>
//             <div style={{ height: 220 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={revenuePerWeek}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="week" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2} dot={false} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-2xl border bg-white p-4 shadow-sm">
//           <div className="mb-3 flex items-center justify-between">
//             <div className="text-sm font-semibold">Top-selling Items</div>
//             <div className="text-xs text-gray-500">This period</div>
//           </div>
//           <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
//             {topSelling.map((t) => (
//               <div key={t.name} className="rounded-xl border p-3">
//                 <div className="text-sm text-gray-500">{t.name}</div>
//                 <div className="mt-2 text-xl font-semibold">{t.qty}</div>
//                 <div className="mt-1 text-xs text-gray-400">units sold</div>
//               </div>
//             ))}
//             {topSelling.length === 0 && <div className="p-4 text-sm text-gray-500">No sales yet.</div>}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function OrdersView() {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <h2 className="text-lg font-semibold">Orders</h2>
//             <div className="text-sm text-gray-400">Manage & update order statuses</div>
//           </div>

//           <div className="flex items-center gap-2">
//             <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search order id or customer" className="hidden md:block w-64 rounded-xl border px-3 py-2 text-sm outline-none" />
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "ALL")} className="rounded-xl border px-3 py-2 text-sm">
//               <option value="ALL">All statuses</option>
//               {orderStatuses.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="rounded-2xl border bg-white p-3 shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="text-xs text-gray-500">
//                 <tr>
//                   <th className="px-3 py-2 text-left">Order</th>
//                   <th className="px-3 py-2 text-left">Customer</th>
//                   <th className="px-3 py-2 text-left">Items</th>
//                   <th className="px-3 py-2 text-left">Total</th>
//                   <th className="px-3 py-2 text-left">Payment</th>
//                   <th className="px-3 py-2 text-left">Status</th>
//                   <th className="px-3 py-2 text-left">Created</th>
//                   <th className="px-3 py-2 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-gray-700">
//                 {filteredOrders.map((o) => (
//                   <tr key={o.id} className="border-t hover:bg-gray-50">
//                     <td className="px-3 py-3 font-medium">{o.id}</td>
//                     <td className="px-3 py-3">{findCustomerName(o.customerId)}</td>
//                     <td className="px-3 py-3">{o.items.reduce((a, b) => a + b.qty, 0)}</td>
//                     <td className="px-3 py-3">{currency(o.total)}</td>
//                     <td className="px-3 py-3"><Badge color={o.paymentMethod === "ESEWA" ? "emerald" : o.paymentMethod === "KHALTI" ? "violet" : o.paymentMethod === "FONEPAY" ? "red" : "gray"}>{o.paymentMethod}</Badge></td>
//                     <td className="px-3 py-3">
//                       <Badge color={o.status === "PENDING" ? "amber" : o.status === "PROCESSING" ? "blue" : o.status === "COMPLETED" ? "emerald" : "red"}>{o.status}</Badge>
//                     </td>
//                     <td className="px-3 py-3">{fmtDate(o.createdAt)}</td>
//                     <td className="px-3 py-3">
//                       <div className="flex gap-2">
//                         <button onClick={() => setOpenOrderId(o.id)} className="rounded-xl border px-3 py-1 text-xs hover:bg-gray-50">View</button>
//                         <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)} className="rounded-xl border px-2 py-1 text-xs">
//                           {orderStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
//                         </select>
//                         <button onClick={() => deleteOrder(o.id)} className="rounded-xl border px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {filteredOrders.length === 0 && (
//                   <tr>
//                     <td colSpan={8} className="px-3 py-6 text-center text-sm text-gray-500">No orders found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <Modal open={!!openOrder} onClose={() => setOpenOrderId(null)} title={openOrder ? `Order ${openOrder.id}` : ""}>
//           {openOrder && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <div className="text-xs text-gray-500">Customer</div>
//                   <div className="font-medium">{findCustomerName(openOrder.customerId)}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Payment</div>
//                   <Badge color="emerald">{openOrder.paymentMethod}</Badge>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Created</div>
//                   <div className="font-medium">{fmtDate(openOrder.createdAt)}</div>
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Status</div>
//                   <Badge color={openOrder.status === "PENDING" ? "amber" : openOrder.status === "PROCESSING" ? "blue" : openOrder.status === "COMPLETED" ? "emerald" : "red"}>{openOrder.status}</Badge>
//                 </div>
//               </div>

//               <div className="rounded-xl border">
//                 <table className="min-w-full">
//                   <thead className="bg-gray-50 text-xs text-gray-600">
//                     <tr>
//                       <th className="px-3 py-2 text-left">Item</th>
//                       <th className="px-3 py-2 text-left">Qty</th>
//                       <th className="px-3 py-2 text-left">Price</th>
//                       <th className="px-3 py-2 text-left">Subtotal</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {openOrder.items.map((it, i) => (
//                       <tr key={i} className="border-t">
//                         <td className="px-3 py-2">{it.name}</td>
//                         <td className="px-3 py-2">{it.qty}</td>
//                         <td className="px-3 py-2">{currency(it.price)}</td>
//                         <td className="px-3 py-2">{currency(it.price * it.qty)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {openOrder.notes && <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">Note: {openOrder.notes}</div>}

//               <div className="flex items-center justify-between">
//                 <div className="text-lg font-semibold">Total: {currency(openOrder.total)}</div>
//                 <div className="flex gap-2">
//                   <select value={openOrder.status} onChange={(e) => updateOrderStatus(openOrder.id, e.target.value as OrderStatus)} className="rounded-xl border px-3 py-2 text-sm">
//                     {orderStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                   <button onClick={() => deleteOrder(openOrder.id)} className="rounded-xl border px-3 py-2 text-sm text-rose-600">Cancel/Delete</button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     );
//   }

//   function MenuView() {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">Menu</h2>
//             <div className="text-sm text-gray-400">Add / edit items available in the shop</div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => { setEditingMenu({ id: `m${Math.random().toString(36).slice(2, 7)}`, name: "", description: "", price: 0, category: "COFFEE", available: true }); setMenuModalOpen(true); }} className="rounded-xl bg-black px-4 py-2 text-sm text-white">+ Add item</button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {menu.map((m) => (
//             <div key={m.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
//               <div className="h-36 w-full bg-gray-100">
//                 {m.imageUrl ? <img src={m.imageUrl} alt={m.name} className="h-36 w-full object-cover" /> : <div className="flex h-36 items-center justify-center text-gray-400">No image</div>}
//               </div>
//               <div className="p-4">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <div className="text-base font-semibold">{m.name || "Untitled"}</div>
//                     <div className="text-xs text-gray-500">{m.category}</div>
//                   </div>
//                   <Badge color={m.available ? "emerald" : "gray"}>{m.available ? "Available" : "Hidden"}</Badge>
//                 </div>
//                 <div className="mt-2 text-sm text-gray-600 line-clamp-2">{m.description}</div>
//                 <div className="mt-3 flex items-center justify-between">
//                   <div className="text-lg font-semibold">{currency(m.price)}</div>
//                   <div className="flex gap-2">
//                     <button onClick={() => { setEditingMenu(m); setMenuModalOpen(true); }} className="rounded-xl border px-3 py-1 text-xs hover:bg-gray-50">Edit</button>
//                     <button onClick={() => deleteMenu(m.id)} className="rounded-xl border px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">Delete</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <Modal open={menuModalOpen} onClose={() => setMenuModalOpen(false)} title={editingMenu?.name ? `Edit: ${editingMenu.name}` : "Add Menu Item"}>
//           {editingMenu && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 <label className="text-sm">
//                   <div className="text-xs text-gray-500">Name</div>
//                   <input value={editingMenu.name} onChange={(e) => setEditingMenu({ ...editingMenu, name: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" />
//                 </label>

//                 <label className="text-sm">
//                   <div className="text-xs text-gray-500">Category</div>
//                   <select value={editingMenu.category} onChange={(e) => setEditingMenu({ ...editingMenu, category: e.target.value as any })} className="w-full rounded-xl border px-3 py-2 text-sm">
//                     <option value="COFFEE">COFFEE</option>
//                     <option value="TEA">TEA</option>
//                     <option value="FOOD">FOOD</option>
//                   </select>
//                 </label>

//                 <label className="text-sm">
//                   <div className="text-xs text-gray-500">Price</div>
//                   <input type="number" value={editingMenu.price} onChange={(e) => setEditingMenu({ ...editingMenu, price: Number(e.target.value) })} className="w-full rounded-xl border px-3 py-2 text-sm" />
//                 </label>

//                 <label className="text-sm">
//                   <div className="text-xs text-gray-500">Image URL</div>
//                   <input value={editingMenu.imageUrl} onChange={(e) => setEditingMenu({ ...editingMenu, imageUrl: e.target.value })} className="w-full rounded-xl border px-3 py-2 text-sm" />
//                 </label>
//               </div>

//               <label className="text-sm">
//                 <div className="text-xs text-gray-500">Description</div>
//                 <textarea value={editingMenu.description} onChange={(e) => setEditingMenu({ ...editingMenu, description: e.target.value })} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
//               </label>

//               <label className="flex items-center gap-2 text-sm">
//                 <input type="checkbox" checked={editingMenu.available} onChange={(e) => setEditingMenu({ ...editingMenu, available: e.target.checked })} />
//                 Available
//               </label>

//               <div className="flex justify-end gap-2">
//                 <button onClick={() => { if (!editingMenu.name) return alert("Name required"); upsertMenu(editingMenu); setMenuModalOpen(false); }} className="rounded-xl bg-black px-4 py-2 text-sm text-white">Save</button>
//               </div>
//             </div>
//           )}
//         </Modal>
//       </div>
//     );
//   }

//   function PaymentsView() {
//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold">Payments</h2>
//             <div className="text-sm text-gray-400">Track payments received</div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={() => exportCSV(payments, "payments.csv")} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">Export CSV</button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Today</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.day)}</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">This Week</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.week)}</div>
//           </div>
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">This Month</div>
//             <div className="mt-2 text-2xl font-semibold">{currency(totals.month)}</div>
//           </div>
//         </div>

//         <div className="rounded-2xl border bg-white p-3 shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="text-xs text-gray-500">
//                 <tr>
//                   <th className="px-3 py-2 text-left">Payment</th>
//                   <th className="px-3 py-2 text-left">Order</th>
//                   <th className="px-3 py-2 text-left">Method</th>
//                   <th className="px-3 py-2 text-left">Amount</th>
//                   <th className="px-3 py-2 text-left">Status</th>
//                   <th className="px-3 py-2 text-left">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm text-gray-700">
//                 {payments.slice().sort((a,b)=>+new Date(b.createdAt)-+new Date(a.createdAt)).map((p) => (
//                   <tr key={p.id} className="border-t hover:bg-gray-50">
//                     <td className="px-3 py-3 font-medium">{p.id}</td>
//                     <td className="px-3 py-3">{p.orderId}</td>
//                     <td className="px-3 py-3">{p.method}</td>
//                     <td className="px-3 py-3">{currency(p.amount)}</td>
//                     <td className="px-3 py-3">{p.status}</td>
//                     <td className="px-3 py-3">{fmtDate(p.createdAt)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function CustomersView() {
//     return (
//       <div className="space-y-4">
//         <div>
//           <h2 className="text-lg font-semibold">Customers</h2>
//           <div className="text-sm text-gray-400">Customer list & lifetime value</div>
//         </div>

//         <div className="rounded-2xl border bg-white p-3 shadow-sm">
//           <table className="min-w-full table-auto">
//             <thead className="text-xs text-gray-500">
//               <tr>
//                 <th className="px-3 py-2 text-left">Name</th>
//                 <th className="px-3 py-2 text-left">Email</th>
//                 <th className="px-3 py-2 text-left">Phone</th>
//                 <th className="px-3 py-2 text-left">Total Orders</th>
//                 <th className="px-3 py-2 text-left">Total Spend</th>
//                 <th className="px-3 py-2 text-left">Since</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-700">
//               {customers.map((c) => {
//                 const custOrders = orders.filter((o) => o.customerId === c.id);
//                 return (
//                   <tr key={c.id} className="border-t hover:bg-gray-50">
//                     <td className="px-3 py-3 font-medium">{c.name}</td>
//                     <td className="px-3 py-3">{c.email}</td>
//                     <td className="px-3 py-3">{c.phone}</td>
//                     <td className="px-3 py-3">{custOrders.length}</td>
//                     <td className="px-3 py-3">{currency(custOrders.reduce((a,b)=>a+b.total,0))}</td>
//                     <td className="px-3 py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }

//   function AnalyticsView() {
//     return (
//       <div className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Orders trend</div>
//             <div style={{ height: 180 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={ordersPerDay}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis allowDecimals={false} />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="count" stroke="#0f172a" strokeWidth={2} dot={false} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Revenue (weeks)</div>
//             <div style={{ height: 180 }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={revenuePerWeek}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="week" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="revenue" fill="#111827" radius={[6,6,0,0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           <div className="rounded-2xl border bg-white p-5 shadow-sm">
//             <div className="text-sm text-gray-500">Top items</div>
//             <div className="mt-3 space-y-2">
//               {topSelling.map((t) => (
//                 <div key={t.name} className="flex items-center justify-between">
//                   <div className="text-sm">{t.name}</div>
//                   <div className="text-sm font-semibold">{t.qty}</div>
//                 </div>
//               ))}
//               {topSelling.length === 0 && <div className="text-sm text-gray-500">No data</div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function SettingsView() {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h2 className="text-lg font-semibold">Settings</h2>
//           <div className="text-sm text-gray-400">Basic business & appearance settings (demo)</div>
//         </div>

//         <div className="rounded-2xl border bg-white p-6 shadow-sm">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//             <label className="text-sm">
//               <div className="text-xs text-gray-500">Business name</div>
//               <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Awesome Coffee" />
//             </label>

//             <label className="text-sm">
//               <div className="text-xs text-gray-500">Contact email</div>
//               <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="hello@coffeeshop.com" />
//             </label>

//             <label className="text-sm">
//               <div className="text-xs text-gray-500">Phone</div>
//               <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="+977-98xxxxxxx" />
//             </label>

//             <label className="text-sm">
//               <div className="text-xs text-gray-500">Address</div>
//               <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="New Road, Kathmandu" />
//             </label>
//           </div>

//           <div className="mt-4 flex justify-end">
//             <button className="rounded-xl bg-black px-4 py-2 text-sm text-white">Save</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* -----------------------
//      Shell layout
//      ----------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex gap-6">
//           <Sidebar />

//           <div className="flex-1">
//             {/* Topbar */}
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <div className="text-xl font-semibold">{tab}</div>
//                 <div className="text-sm text-gray-500">Owner Admin Dashboard</div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="hidden md:block">
//                   <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Quick search orders/customers..." className="w-64 rounded-xl border px-3 py-2 text-sm" />
//                 </div>
//                 <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
//               </div>
//             </div>

//             {/* content */}
//             <div>
//               {tab === "Dashboard" && <DashboardView />}
//               {tab === "Orders" && <OrdersView />}
//               {tab === "Menu" && <MenuView />}
//               {tab === "Payments" && <PaymentsView />}
//               {tab === "Customers" && <CustomersView />}
//               {tab === "Analytics" && <AnalyticsView />}
//               {tab === "Settings" && <SettingsView />}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }































"use client";
import React, { useState, useEffect, JSX } from "react";
import { 
  BarChart3, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  Edit3,
  Filter,
  Download,
  Plus,
  Trash2,
  LogOut
} from "lucide-react";

// Types
interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  deliveryOption: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  id: number;
  name: string;
  basePrice: number;
  customization: {
    size?: string;
    sugarLevel?: string;
    toppings?: string[];
    [key: string]: string | string[] | number | undefined};
  finalPrice: number;
  quantity: number;
}

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
}

interface ProductPerformance {
  id: number;
  name: string;
  category: string;
  quantitySold: number;
  revenue: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  customizationOptions: CustomizationOption[];
}

interface CustomizationOption {
  type: string;
  label: string;
  options: { value: string; price: number }[];
}

export default function OwnerDashboard(): JSX.Element {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [productPerformance, setProductPerformance] = useState<ProductPerformance[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [timeRange, setTimeRange] = useState<string>('today');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // New item form state
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Tea',
    image: '',
    isAvailable: true,
    customizationOptions: []
  });

  // Fetch orders and data (simulated)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const sampleOrders: Order[] = [
          {
            id: 'ORD-7G5H2J9K3L',
            customerName: 'John Doe',
            phoneNumber: '123-456-7890',
            items: [
              {
                id: 1,
                name: 'Milk Tea',
                basePrice: 4.5,
                customization: { size: 'Medium', sugarLevel: 'Normal', quantity: 2 },
                finalPrice: 9.0,
                quantity: 2
              }
            ],
            total: 11.99,
            status: 'preparing',
            paymentMethod: 'esewa',
            paymentStatus: 'completed',
            deliveryOption: 'home',
            address: '123 Main St',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ];

        const sampleSalesData: SalesData[] = [
          { date: 'Mon', revenue: 450, orders: 12, averageOrderValue: 37.5 },
          { date: 'Tue', revenue: 520, orders: 15, averageOrderValue: 34.67 },
          { date: 'Wed', revenue: 380, orders: 11, averageOrderValue: 34.55 },
          { date: 'Thu', revenue: 610, orders: 18, averageOrderValue: 33.89 },
          { date: 'Fri', revenue: 720, orders: 20, averageOrderValue: 36.0 },
          { date: 'Sat', revenue: 890, orders: 25, averageOrderValue: 35.6 },
          { date: 'Sun', revenue: 950, orders: 28, averageOrderValue: 33.93 },
        ];

        const sampleProductPerformance: ProductPerformance[] = [
          { id: 1, name: 'Milk Tea', category: 'Tea', quantitySold: 45, revenue: 202.5 },
          { id: 2, name: 'Espresso', category: 'Coffee', quantitySold: 38, revenue: 95.0 },
          { id: 3, name: 'Latte', category: 'Coffee', quantitySold: 32, revenue: 144.0 },
          { id: 4, name: 'Masala Chiya', category: 'Tea', quantitySold: 28, revenue: 84.0 },
          { id: 5, name: 'Cold Brew', category: 'Coffee', quantitySold: 25, revenue: 93.75 },
        ];

        const sampleMenuItems: MenuItem[] = [
          {
            id: 1,
            name: 'Milk Tea',
            description: 'Classic milk tea with tapioca pearls',
            price: 4.5,
            category: 'Tea',
            image: '/images/milk-tea.jpg',
            isAvailable: true,
            customizationOptions: [
              {
                type: 'size',
                label: 'Size',
                options: [
                  { value: 'Small', price: 0 },
                  { value: 'Medium', price: 0.5 },
                  { value: 'Large', price: 1.0 }
                ]
              },
              {
                type: 'sugar',
                label: 'Sugar Level',
                options: [
                  { value: 'No Sugar', price: 0 },
                  { value: 'Less Sugar', price: 0 },
                  { value: 'Normal', price: 0 },
                  { value: 'Extra Sugar', price: 0 }
                ]
              }
            ]
          },
          {
            id: 2,
            name: 'Espresso',
            description: 'Strong and bold espresso shot',
            price: 3.0,
            category: 'Coffee',
            image: '/images/espresso.jpg',
            isAvailable: true,
            customizationOptions: [
              {
                type: 'shots',
                label: 'Espresso Shots',
                options: [
                  { value: 'Single', price: 0 },
                  { value: 'Double', price: 1.0 },
                  { value: 'Triple', price: 2.0 }
                ]
              }
            ]
          }
        ];

        setOrders(sampleOrders);
        setFilteredOrders(sampleOrders);
        setSalesData(sampleSalesData);
        setProductPerformance(sampleProductPerformance);
        setMenuItems(sampleMenuItems);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  // Filter orders based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => 
    ['pending', 'confirmed', 'preparing', 'out-for-delivery'].includes(order.status)
  ).length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: new Date() } 
        : order
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'out-for-delivery':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Export report functionality
  const handleExportReport = () => {
    const reportData = orders.map(order => ({
      OrderID: order.id,
      Customer: order.customerName,
      Phone: order.phoneNumber,
      Total: order.total,
      Status: order.status,
      PaymentStatus: order.paymentStatus,
      Date: order.createdAt.toLocaleString(),
    }));

    const csvContent = [
      Object.keys(reportData[0]).join(','), // headers
      ...reportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `orders_report_${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Menu management functions
  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;
    
    const newMenuItem: MenuItem = {
      id: menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1,
      name: newItem.name || '',
      description: newItem.description || '',
      price: newItem.price || 0,
      category: newItem.category || 'Tea',
      image: newItem.image || '',
      isAvailable: newItem.isAvailable !== undefined ? newItem.isAvailable : true,
      customizationOptions: newItem.customizationOptions || []
    };
    
    setMenuItems([...menuItems, newMenuItem]);
    setShowAddItemModal(false);
    resetNewItemForm();
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({ ...item });
    setShowAddItemModal(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem || !newItem.name || !newItem.price) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === editingItem.id 
        ? { 
            ...item, 
            name: newItem.name || '',
            description: newItem.description || '',
            price: newItem.price || 0,
            category: newItem.category || 'Tea',
            image: newItem.image || '',
            isAvailable: newItem.isAvailable !== undefined ? newItem.isAvailable : true,
            customizationOptions: newItem.customizationOptions || []
          }
        : item
    ));
    
    setShowAddItemModal(false);
    setEditingItem(null);
    resetNewItemForm();
  };

  const handleDeleteItem = (id: number) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const resetNewItemForm = () => {
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: 'Tea',
      image: '',
      isAvailable: true,
      customizationOptions: []
    });
  };

  const toggleItemAvailability = (id: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-amber-700 transition-colors"
              onClick={handleExportReport}
            >
              <Download size={18} className="mr-2" />
              Export Report
            </button>
            <div className="relative">
              <select 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?")) {
                  window.location.href = "/adminlogin";
                }
              }}
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 size={18} /> },
              { id: 'orders', name: 'Orders', icon: <Package size={18} /> },
              { id: 'menu', name: 'Menu Management', icon: <Edit3 size={18} /> },
              { id: 'customers', name: 'Customers', icon: <Users size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 font-medium text-sm flex items-center border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                    <DollarSign size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    <span>12.5% from last week</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <Package size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    <span>8.3% from last week</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                    <Clock size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{pendingOrders}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">To be processed</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    <CheckCircle size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                    <p className="text-2xl font-semibold text-gray-900">{completedOrders}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Successfully delivered</p>
                </div>
              </div>
            </div>

            {/* Charts and Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h2>
                <div className="h-64">
                  {/* Revenue chart would go here */}
                  <div className="flex items-end justify-between h-48 mt-4">
                    {salesData.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-amber-500 rounded-t w-8"
                          style={{ height: `${(day.revenue / 1000) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{day.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Revenue last 7 days
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Items</h2>
                <div className="space-y-4">
                  {productPerformance.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(product.revenue)}</p>
                        <p className="text-sm text-gray-500">{product.quantitySold} sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.length} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(order.status)}`}>
                            {order.status.replace(/-/g, ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt.toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Order Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <select 
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center hover:bg-gray-50">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.customerName}</div>
                        <div className="text-xs text-gray-400">{order.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(order.status)}`}>
                          {order.status.replace(/-/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-900"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Menu Management</h2>
              <button 
                className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-amber-700 transition-colors"
                onClick={() => setShowAddItemModal(true)}
              >
                <Plus size={18} className="mr-2" />
                Add New Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 text-xs rounded-full cursor-pointer ${
                            item.isAvailable 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                          onClick={() => toggleItemAvailability(item.id)}
                        >
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-amber-600 hover:text-amber-900 mr-3"
                          onClick={() => handleEditItem(item)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <h3 className="text-xl font-medium text-gray-900">
                    Order #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                      <p className="mt-1"><span className="font-medium">Phone:</span> {selectedOrder.phoneNumber}</p>
                      {selectedOrder.address && (
                        <p className="mt-1"><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                      )}
                      <p className="mt-1"><span className="font-medium">Delivery:</span> {selectedOrder.deliveryOption}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Order Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><span className="font-medium">Order Date:</span> {selectedOrder.createdAt.toLocaleString()}</p>
                      <p className="mt-1"><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                      <p className="mt-1"><span className="font-medium">Payment Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedOrder.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : selectedOrder.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedOrder.paymentStatus}
                        </span>
                      </p>
                      <div className="mt-3">
                        <span className="font-medium">Order Status:</span>
                        <div className="mt-1">
                          <select 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            value={selectedOrder.status}
                            onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="out-for-delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.quantity}x {item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.customization.size} • {item.customization.sugarLevel} sugar
                            </p>
                            {item.customization.toppings && item.customization.toppings.length > 0 && (
                              <p className="text-sm text-gray-600">
                                Toppings: {item.customization.toppings.join(", ")}
                              </p>
                            )}
                          </div>
                          <p className="font-medium">{formatCurrency(item.finalPrice)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    onClick={() => {
                      // Handle order update
                      setSelectedOrder(null);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Menu Item Modal */}
        {showAddItemModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <h3 className="text-xl font-medium text-gray-900">
                    {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddItemModal(false);
                      setEditingItem(null);
                      resetNewItemForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Enter item name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      placeholder="Enter item description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={newItem.category}
                        onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      >
                        <option value="Tea">Tea</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Juice">Juice</option>
                        <option value="Smoothie">Smoothie</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={newItem.image}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAvailable"
                      className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      checked={newItem.isAvailable}
                      onChange={(e) => setNewItem({...newItem, isAvailable: e.target.checked})}
                    />
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                      Available for ordering
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => {
                      setShowAddItemModal(false);
                      setEditingItem(null);
                      resetNewItemForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    onClick={editingItem ? handleUpdateItem : handleAddItem}
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
"use client";
import React, { JSX, useState } from "react";
import Image from "next/image";

// Define types
interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Customization {
  size: string;
  sugarLevel: string;
  milkPreference: string;
  toppings: string[];
  whippedCream: boolean;
  extraShot: boolean;
  vanillaSyrup: boolean;
  quantity: number;
}

interface OrderItem {
  id: number;
  name: string;
  basePrice: number;
  customization: Customization;
  finalPrice: number;
}

interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  fee: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  logo: string;
  Url: string;
  redirectUrl?: string;
}


export default function OrderNow(): JSX.Element {
  // Sample menu data
  const menuItems: MenuItem[] = [
    { id: 1, name: "Milk Tea", price: 4.5, category: "Tea" },
    { id: 2, name: "Black Tea", price: 3.5, category: "Tea" },
    { id: 3, name: "Green Tea", price: 3.5, category: "Tea" },
    { id: 4, name: "Espresso", price: 2.5, category: "Coffee" },
    { id: 5, name: "Cappuccino", price: 4.0, category: "Coffee" },
    { id: 6, name: "Latte", price: 4.5, category: "Coffee" },
    { id: 7, name: "Cold Brew", price: 3.75, category: "Coffee" },
    { id: 8, name: "Masala Chiya", price: 3.0, category: "Tea" },
    { id: 9, name: "Herbal Blend", price: 4.0, category: "Tea" },
    { id: 10, name: "Honey Ginger Tea", price: 3.85, category: "Tea" },
  ];

  // Delivery options
  const deliveryOptions: DeliveryOption[] = [
    {
      id: "home",
      name: "Home Delivery",
      description: "Get your order delivered to your doorstep",
      fee: 2.99,
    },
    {
      id: "pickup",
      name: "Pickup at Store",
      description: "Collect your order from our store",
      fee: 0,
    },
  ];

  // Payment methods with professional logos and redirect URLs
  const paymentMethods: PaymentMethod[] = [
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay with cash when your order arrives",
      logo: "/cash.png",
      Url: "",
      redirectUrl: "",
    },
    {
      id: "esewa",
      name: "eSewa",
      description: "Pay with your eSewa digital wallet",
      logo: "/download.png",
      Url: "https://esewa.com.np/",
      redirectUrl: "https://esewa.com.np/#/home/payment",
    },
    {
      id: "khalti",
      name: "Khalti",
      description: "Pay with Khalti wallet",
      logo: "/khalti.png",
      Url: "https://web.khalti.com/?csrt=24083829963492#/payment",
      redirectUrl: "https://web.khalti.com/?csrt=24083829963492#/payment",
    },
    {
      id: "fonepay",
      name: "Fonepay",
      description: "Pay with Fonepay",
      logo: "/fonepay.png",
      Url: "https://fonepay.com/payment",
      redirectUrl: "https://fonepay.com/payment",
    },
  ];

  // State management
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [customization, setCustomization] = useState<Customization>({
    size: "Medium",
    sugarLevel: "Normal",
    milkPreference: "Regular Milk",
    toppings: [],
    whippedCream: false,
    extraShot: false,
    vanillaSyrup: false,
    quantity: 1,
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [deliveryOption, setDeliveryOption] = useState<string>(
    deliveryOptions[0].id
  );
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    fullName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>(
    paymentMethods[0].id
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [orderId, setOrderId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>("");

  // Filter items by category
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Categories for filtering
  const categories = ["All", "Tea", "Coffee"];

  // Calculate additional costs from customization
  const calculateAdditionalCost = (): number => {
    let cost = 0;

    if (customization.toppings.includes("Ginger")) cost += 0.5;
    if (customization.toppings.includes("Masala")) cost += 0.75;
    if (customization.whippedCream) cost += 0.6;
    if (customization.extraShot) cost += 1.0;
    if (customization.vanillaSyrup) cost += 0.5;

    return cost;
  };

  // Calculate final price
  const calculateFinalPrice = (basePrice: number): number => {
    const additionalCost = calculateAdditionalCost();
    let sizeMultiplier = 1;

    if (customization.size === "Small") sizeMultiplier = 0.9;
    if (customization.size === "Large") sizeMultiplier = 1.2;

    return (
      (basePrice * sizeMultiplier + additionalCost) * customization.quantity
    );
  };

  // Handle topping selection
  const toggleTopping = (topping: string) => {
    setCustomization((prev) => {
      const newToppings = prev.toppings.includes(topping)
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];

      return { ...prev, toppings: newToppings };
    });
  };

  // Add customized item to order
  const addCustomizedItemToOrder = () => {
    if (!selectedItem) return;

    const newItem: OrderItem = {
      id: Date.now(),
      name: selectedItem.name,
      basePrice: selectedItem.price,
      customization: { ...customization },
      finalPrice: calculateFinalPrice(selectedItem.price),
    };

    setOrderItems((prev) => [...prev, newItem]);
    setSelectedItem(null);
    setCustomization({
      size: "Medium",
      sugarLevel: "Normal",
      milkPreference: "Regular Milk",
      toppings: [],
      whippedCream: false,
      extraShot: false,
      vanillaSyrup: false,
      quantity: 1,
    });
    setCurrentStep(1);
  };

  // Remove item from order
  const removeFromOrder = (id: number) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const deliveryFee =
    deliveryOptions.find((opt) => opt.id === deliveryOption)?.fee || 0;
  const subtotal = orderItems.reduce((sum, item) => sum + item.finalPrice, 0);
  const total = subtotal + deliveryFee;

  // Handle customer details change
  const handleCustomerDetailsChange = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Generate a random order ID
  const generateOrderId = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ORD-";
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Simulate payment processing
  const simulatePayment = async (): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2;

        if (isSuccess) {
          resolve({ success: true });
        } else {
          const errors = [
            "Insufficient balance",
            "Transaction timeout",
            "Network error",
            "Payment declined",
            "Invalid credentials",
          ];
          resolve({
            success: false,
            error: errors[Math.floor(Math.random() * errors.length)],
          });
        }
      }, 2000);
    });
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (paymentMethod === "cash") {
      // For Cash on Delivery, process directly
      setIsProcessing(true);
      setCurrentStep(5);

      setTimeout(() => {
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        setCurrentStep(6);
        setIsProcessing(false);
      }, 1500);
    } else {
      // For digital wallets, redirect to official payment page
      const selectedPaymentMethod = paymentMethods.find(
        (method) => method.id === paymentMethod
      );
      if (selectedPaymentMethod && selectedPaymentMethod.redirectUrl) {
        // Simulate redirect to payment gateway
        setIsProcessing(true);
        setCurrentStep(5);

        setTimeout(() => {
          // After redirect simulation, process payment
          void handlePaymentRedirect();
        }, 1000);
      } else {
        // No redirect URL - fallback simulate
        setIsProcessing(true);
        setCurrentStep(5);
        setTimeout(() => {
          void handlePaymentRedirect();
        }, 800);
      }
    }
  };

  // Handle payment redirect simulation
  const handlePaymentRedirect = async () => {
    try {
      const result = await simulatePayment();

      if (result.success) {
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        setCurrentStep(6);
      } else {
        setPaymentError(result.error || "Payment failed");
        setCurrentStep(7);
      }
    } catch {
      setPaymentError("An unexpected error occurred");
      setCurrentStep(7);
    } finally {
      setIsProcessing(false);
    }
  };

  // Retry payment with same method
  const retryPayment = () => {
    setPaymentError("");
    setCurrentStep(4);
  };

  // Try different payment method
  const tryDifferentMethod = () => {
    setPaymentError("");
    setCurrentStep(4);
  };

  // Format payment method name for display
  const formatPaymentMethodName = (): string => {
    switch (paymentMethod) {
      case "esewa":
        return "eSewa (Digital Wallet)";
      case "khalti":
        return "Khalti (Digital Wallet)";
      case "fonepay":
        return "Fonepay";
      case "cash":
      default:
        return "Cash on Delivery";
    }
  };

  // Reset order and go back to menu
  const resetOrder = () => {
    setOrderItems([]);
    setCurrentStep(1);
    setCustomerDetails({
      fullName: "",
      phoneNumber: "",
      deliveryAddress: "",
    });
    setPaymentError("");
    setOrderId("");
  };

  // Function to download payment voucher
  const downloadPaymentVoucher = () => {
    // Create a HTML content for the voucher
    const voucherContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Voucher - Order #${orderId}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .voucher { border: 2px solid #d97706; border-radius: 10px; padding: 20px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; color: #d97706; }
          .order-details { margin-bottom: 20px; }
          .order-items { margin-bottom: 20px; }
          .total { font-weight: bold; font-size: 18px; border-top: 1px solid #ccc; padding-top: 10px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="voucher">
          <div class="header">
            <div class="logo">Chiya & Coffee Shop</div>
            <h1>Payment Voucher</h1>
            <p>Order #${orderId}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="order-details">
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${customerDetails.fullName}</p>
            <p><strong>Phone:</strong> ${customerDetails.phoneNumber}</p>
            ${deliveryOption === "home" ? `<p><strong>Address:</strong> ${customerDetails.deliveryAddress}</p>` : ''}
            <p><strong>Payment Method:</strong> ${formatPaymentMethodName()}</p>
          </div>
          
          <div class="order-items">
            <h2>Order Items</h2>
            <table width="100%">
              ${orderItems.map(item => `
                <tr>
                  <td>${item.customization.quantity}x ${item.name} (${item.customization.size})</td>
                  <td align="right">$${item.finalPrice.toFixed(2)}</td>
                </tr>
                ${item.customization.toppings.length > 0 ? `
                  <tr>
                    <td colspan="2" style="font-size: 12px; padding-left: 20px;">
                      Toppings: ${item.customization.toppings.join(', ')}
                    </td>
                  </tr>
                ` : ''}
              `).join('')}
            </table>
          </div>
          
          <div class="total">
            <table width="100%">
              <tr>
                <td>Subtotal:</td>
                <td align="right">$${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Delivery Fee:</td>
                <td align="right">$${deliveryFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td><strong>Total:</strong></td>
                <td align="right"><strong>$${total.toFixed(2)}</strong></td>
              </tr>
            </table>
          </div>
          
          <div class="footer">
            <p>Thank you for your order!</p>
            <p>Contact us: support@example.com | +977-1-XXXXXXX</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([voucherContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-voucher-${orderId}.html`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/coffee.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Chiya & Coffee <br /> at Your Doorstep
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Handcrafted beverages delivered hot & fresh to your door
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      {currentStep !== 6 && currentStep !== 7 && (
        <div className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? "bg-amber-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 ${
                        currentStep > step ? "bg-amber-600" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span
                className={currentStep === 1 ? "font-semibold text-amber-700" : ""}
              >
                Menu
              </span>
              <span
                className={currentStep === 2 ? "font-semibold text-amber-700" : ""}
              >
                Customize
              </span>
              <span
                className={currentStep === 3 ? "font-semibold text-amber-700" : ""}
              >
                Details
              </span>
              <span
                className={currentStep === 4 ? "font-semibold text-amber-700" : ""}
              >
                Payment
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        {currentStep === 5 ? (
          // Payment Processing Screen
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-amber-600 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-amber-700 mb-2">
                {paymentMethod === "cash" ? "Processing Order" : "Redirecting to Payment"}
              </h3>
              <p className="text-gray-600">
                {paymentMethod === "cash"
                  ? "Please wait while we process your order..."
                  : "You will be redirected to the secure payment gateway..."}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Amount:</span>
                <span className="font-bold text-lg">NPR {total.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-semibold">Payment Method:</span>
                <span className="font-medium">{formatPaymentMethodName()}</span>
              </div>
            </div>

            <div className="text-center text-gray-500">
              <p>Do not refresh or close this page.</p>
            </div>
          </div>
        ) : currentStep === 6 ? (
          // Payment Success Screen with Voucher
          <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
            <div className="bg-green-600 text-white p-6 text-center relative">
              {/* Back Button */}
              <button
                onClick={resetOrder}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-700 hover:bg-green-800 text-white p-2 rounded-full transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>

              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-lg">Thank you for your purchase. Your order has been successfully placed.</p>
            </div>

            <div className="p-6">
              {/* Voucher Section */}
              <div className="border-2 border-amber-400 rounded-lg p-6 mb-6 bg-amber-50">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-amber-800">PAYMENT VOUCHER</h2>
                  <p className="text-amber-600">Order #{orderId}</p>
                  <p className="text-gray-600">{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">CUSTOMER INFORMATION</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {customerDetails.fullName}</p>
                      <p><span className="font-medium">Phone:</span> {customerDetails.phoneNumber}</p>
                      {deliveryOption === "home" && (
                        <p><span className="font-medium">Address:</span> {customerDetails.deliveryAddress}</p>
                      )}
                      <p><span className="font-medium">Delivery:</span> {deliveryOptions.find(opt => opt.id === deliveryOption)?.name}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">PAYMENT DETAILS</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Method:</span> {formatPaymentMethodName()}</p>
                      <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Paid</span></p>
                      <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString()}</p>
                      <p><span className="font-medium">Time:</span> {new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">ORDER ITEMS</h3>
                  <div className="space-y-3">
                    {orderItems.map((item, index) => (
                      <div key={index} className="border-b pb-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.customization.quantity}x {item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.customization.size} • {item.customization.sugarLevel} sugar • {item.customization.milkPreference}
                            </p>
                            {item.customization.toppings.length > 0 && (
                              <p className="text-sm text-gray-600">
                                Toppings: {item.customization.toppings.join(", ")}
                              </p>
                            )}
                            {(item.customization.whippedCream || item.customization.extraShot || item.customization.vanillaSyrup) && (
                              <p className="text-sm text-gray-600">
                                Extras:{" "}
                                {[
                                  item.customization.whippedCream ? "Whipped Cream" : "",
                                  item.customization.extraShot ? "Extra Shot" : "",
                                  item.customization.vanillaSyrup ? "Vanilla Syrup" : ""
                                ].filter(Boolean).join(", ")}
                              </p>
                            )}
                          </div>
                          <p className="font-medium">${item.finalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 border-amber-300 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-amber-300">
                    <span>TOTAL:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-center mt-6 pt-4 border-t border-amber-200">
                  <p className="text-sm text-gray-600">Thank you for your order!</p>
                  <p className="text-xs text-gray-500 mt-1">Present this voucher when picking up your order</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Order #{orderId}</h2>
              <p className="text-gray-600 mb-6">
                Placed on {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Status</h2>
                <p className="text-gray-600 mb-4">Track your order progress</p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Order Confirmed</h3>
                      <p className="text-gray-600 text-sm">Your order has been placed successfully</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-green-700">Processing</h3>
                      <p className="text-gray-600 text-sm">We&apos;re preparing your order</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Shipped</h3>
                      <p className="text-gray-600 text-sm">Your order is on the way</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Delivered</h3>
                      <p className="text-gray-600 text-sm">
                        Expected by {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={downloadPaymentVoucher}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download Receipt
                </button>
                <button
                  onClick={resetOrder}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Place Another Order
                </button>
              </div>

              {/* Support Information */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700 text-center">
                  Need help with your order? Contact our support team at{" "}
                  <a href="mailto:support@example.com" className="text-green-600 hover:underline font-medium">
                    support@example.com
                  </a>{" "}
                  or{" "}
                  <a href="tel:+977-1-XXXXXXX" className="text-green-600 hover:underline font-medium">
                    +977-1-XXXXXXX
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : currentStep === 7 ? (
          // Payment Failure Screen
          <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-red-700 mb-2">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-4">
                We couldn&apos;t process your payment. {paymentError}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-red-800">Payment Amount:</span>
                <span className="font-bold text-lg text-red-800">NPR {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-gray-800">What would you like to do?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={retryPayment}
                  className="bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center"
                >
                  Retry This Payment Method
                </button>

                <button
                  onClick={tryDifferentMethod}
                  className="bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                >
                  Try Different Payment Method
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Menu/Customization/Details/Payment */}
            <div className="lg:w-2/3">
              {currentStep === 1 && (
                <>
                  <h2 className="text-3xl font-bold text-amber-900 mb-6">
                    Select Your Drink
                  </h2>

                  {/* Category Filter */}
                  <div className="flex gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-4 py-2 rounded-full transition-colors ${
                          activeCategory === category
                            ? "bg-amber-600 text-white"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold text-amber-900">
                            {item.name}
                          </h3>
                          <p className="text-amber-600">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setCurrentStep(2);
                          }}
                          className="bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 transition-colors"
                        >
                          Customize
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {currentStep === 2 && selectedItem && (
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mb-4 text-amber-600 hover:text-amber-800 flex items-center"
                  >
                    ← Back to Menu
                  </button>

                  <h2 className="text-2xl font-bold text-amber-900 mb-6">
                    Customize Your {selectedItem.name}
                  </h2>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-amber-800 mb-3">Size</h3>
                    <div className="flex gap-4">
                      {["Small", "Medium", "Large"].map((size) => (
                        <button
                          key={size}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            customization.size === size
                              ? "bg-amber-600 text-white"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }`}
                          onClick={() =>
                            setCustomization((prev) => ({ ...prev, size }))
                          }
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sugar Level */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-amber-800 mb-3">
                      Sugar Level
                    </h3>
                    <div className="flex gap-4">
                      {["None", "Less", "Normal", "Extra"].map((level) => (
                        <button
                          key={level}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            customization.sugarLevel === level
                              ? "bg-amber-600 text-white"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }`}
                          onClick={() =>
                            setCustomization((prev) => ({
                              ...prev,
                              sugarLevel: level,
                            }))
                          }
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milk Preference */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-amber-800 mb-3">
                      Milk Preference
                    </h3>
                    <div className="flex gap-4 flex-wrap">
                      {[
                        "Regular Milk",
                        "Almond Milk",
                        "Oat Milk",
                        "Soy Milk",
                        "No Milk",
                      ].map((milk) => (
                        <button
                          key={milk}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            customization.milkPreference === milk
                              ? "bg-amber-600 text-white"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }`}
                          onClick={() =>
                            setCustomization((prev) => ({
                              ...prev,
                              milkPreference: milk,
                            }))
                          }
                        >
                          {milk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Toppings */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-amber-800 mb-3">
                      Extra Toppings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: "Ginger", price: 0.5 },
                        { name: "Masala", price: 0.75 },
                        { name: "Whipped Cream", price: 0.6, isBoolean: true },
                        { name: "Extra Shot", price: 1.0, isBoolean: true },
                        { name: "Vanilla Syrup", price: 0.5, isBoolean: true },
                      ].map((topping) => (
                        <div
                          key={topping.name}
                          className={`flex justify-between items-center p-3 rounded-lg border cursor-pointer ${
                            (
                              topping.isBoolean
                                ? (topping.name === "Whipped Cream" &&
                                    customization.whippedCream) ||
                                  (topping.name === "Extra Shot" &&
                                    customization.extraShot) ||
                                  (topping.name === "Vanilla Syrup" &&
                                    customization.vanillaSyrup)
                                : customization.toppings.includes(topping.name)
                            )
                              ? "border-amber-600 bg-amber-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => {
                            if (topping.isBoolean) {
                              if (topping.name === "Whipped Cream") {
                                setCustomization((prev) => ({
                                  ...prev,
                                  whippedCream: !prev.whippedCream,
                                }));
                              } else if (topping.name === "Extra Shot") {
                                setCustomization((prev) => ({
                                  ...prev,
                                  extraShot: !prev.extraShot,
                                }));
                              } else if (topping.name === "Vanilla Syrup") {
                                setCustomization((prev) => ({
                                  ...prev,
                                  vanillaSyrup: !prev.vanillaSyrup,
                                }));
                              }
                            } else {
                              toggleTopping(topping.name);
                            }
                          }}
                        >
                          <span>{topping.name}</span>
                          <span className="text-amber-600">
                            +${topping.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-amber-800 mb-3">
                      Quantity
                    </h3>
                    <div className="flex items-center gap-4">
                      <button
                        className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200"
                        onClick={() =>
                          setCustomization((prev) => ({
                            ...prev,
                            quantity: Math.max(1, prev.quantity - 1),
                          }))
                        }
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">
                        {customization.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center hover:bg-amber-200"
                        onClick={() =>
                          setCustomization((prev) => ({
                            ...prev,
                            quantity: prev.quantity + 1,
                          }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Order Button */}
                  <button
                    onClick={addCustomizedItemToOrder}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Add to Order - $
                    {calculateFinalPrice(selectedItem.price).toFixed(2)}
                  </button>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="mb-4 text-amber-600 hover:text-amber-800 flex items-center"
                  >
                    ← Back to Menu
                  </button>

                  <h2 className="text-2xl font-bold text-amber-900 mb-6">
                    Delivery Options
                  </h2>

                  {/* Delivery Options */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {deliveryOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer ${
                            deliveryOption === option.id
                              ? "border-amber-600 bg-amber-50"
                              : "border-gray-200"
                          }`}
                          onClick={() => setDeliveryOption(option.id)}
                        >
                          <h3 className="font-semibold text-amber-800">
                            {option.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {option.description}
                          </p>
                          <p className="text-amber-600 mt-2">
                            {option.fee > 0
                              ? `Delivery fee: $${option.fee.toFixed(2)}`
                              : "No delivery fee"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-amber-900 mb-6">
                    Your Details
                  </h2>

                  {/* Customer Details Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={customerDetails.fullName}
                          onChange={(e) =>
                            handleCustomerDetailsChange("fullName", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={customerDetails.phoneNumber}
                          onChange={(e) =>
                            handleCustomerDetailsChange("phoneNumber", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    {deliveryOption === "home" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          value={customerDetails.deliveryAddress}
                          onChange={(e) =>
                            handleCustomerDetailsChange("deliveryAddress", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                          placeholder="Enter your complete address"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Continue to Payment Button */}
                  <button
                    onClick={() => setCurrentStep(4)}
                    disabled={
                      !customerDetails.fullName ||
                      !customerDetails.phoneNumber ||
                      (deliveryOption === "home" &&
                        !customerDetails.deliveryAddress)
                    }
                    className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-amber-300 disabled:cursor-not-allowed mt-6"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {currentStep === 4 && (
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="mb-4 text-amber-600 hover:text-amber-800 flex items-center"
                  >
                    ← Back to Details
                  </button>

                  <h2 className="text-2xl font-bold text-amber-900 mb-2">
                    Choose Payment Method
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Select your preferred payment option to complete your order
                  </p>

                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">
                        NPR {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-4 mb-8">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer flex items-center ${
                          paymentMethod === method.id
                            ? method.id === "esewa"
                              ? "border-green-600 bg-green-50"
                              : method.id === "khalti"
                              ? "border-purple-600 bg-purple-50"
                              : method.id === "fonepay"
                              ? "border-orange-600 bg-orange-50"
                              : "border-amber-600 bg-amber-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        {/* Professional logo instead of emoji */}
                        <div className="w-8 h-8 mr-4 relative">
                          <Image
                            src={method.logo}
                            alt={method.name}
                            fill
                            sizes="32px"
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <h3
                            className={`font-semibold mb-1 ${
                              paymentMethod === method.id
                                ? method.id === "esewa"
                                  ? "text-green-800"
                                  : method.id === "khalti"
                                  ? "text-purple-800"
                                  : method.id === "fonepay"
                                  ? "text-orange-800"
                                  : "text-amber-800"
                                : "text-gray-800"
                            }`}
                          >
                            {method.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Back to Order
                    </button>
                    <button
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 极狐 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : paymentMethod === "cash" ? "Confirm Order" : "Proceed to Payment"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Order Summary */}
            <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit sticky top-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Order Summary
              </h2>

              {orderItems.length === 0 ? (
                <p className="text-amber-700">No items in your order yet</p>
              ) : (
                <div>
                  <div className="space-y-4 mb-6">
                    {orderItems.map((item) => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {item.customization.quantity > 1 &&
                              `${item.customization.quantity} × `}
                            {item.name}
                          </h3>
                          <p className="font-semibold">
                            ${item.finalPrice.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <p>
                            {item.customization.size},{" "}
                            {item.customization.sugarLevel} sugar,{" "}
                            {item.customization.milkPreference}
                          </p>
                          {item.customization.toppings.length > 0 && (
                            <p>
                              Toppings:{" "}
                              {item.customization.toppings.join(", ")}
                            </p>
                          )}
                          {item.customization.whippedCream && (
                            <p>Whipped Cream</p>
                          )}
                          {item.customization.extraShot && <p>Extra Shot</p>}
                          {item.customization.vanillaSyrup && (
                            <p>Vanilla Syrup</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromOrder(item.id)}
                          className="text-red-500 text-sm mt-2 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {currentStep === 1 && orderItems.length > 0 && (
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors mt-4"
                      >
                        Proceed to Checkout
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
import orderModel from "../models/orderModel.js";

// PLACE ORDER (COD)
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware
    const { items, address, amount } = req.body;

    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(), // ✅ REQUIRED FIX
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// STRIPE (placeholder)
const placeOrderStripe = async (req, res) => {
  res.json({ success: false, message: "Stripe not implemented yet" });
};

// RAZORPAY (placeholder)
const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay not implemented yet" });
};

// ADMIN: ALL ORDERS
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// USER: MY ORDERS
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ADMIN: UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};

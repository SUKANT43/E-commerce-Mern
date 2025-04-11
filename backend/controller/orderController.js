const Order = require('../model/orderModel'); // Ensure correct path

// Create an order
exports.createOrder = async (req, res) => {
    try {
        const { productId, sellerId, quantity, price, AddressId } = req.body;

        const newOrder = new Order({
            userId: req.user.id,  // Setting userId from authenticated user
            productId,
            sellerId,
            quantity,
            price,
            AddressId
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId productId sellerId AddressId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId productId sellerId AddressId');
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const { quantity, price } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { quantity, price },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order updated", order: updatedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Confirm an order
exports.confirmOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { isConfirmed: true, isCancelled: false }, // Ensure it's not cancelled
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order confirmed", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { isCancelled: true, isConfirmed: false }, // Ensure it's not confirmed
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Order not found" });

        res.status(200).json({ message: "Order cancelled", order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

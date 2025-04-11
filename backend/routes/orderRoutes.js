const express = require('express');
const orderController = require('../controller/orderController');
const router = express.Router();
const {protect}=require('../middleWare/userLoginMIddleWare')
router.post('/create',protect, orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

router.put('/:id/confirm', orderController.confirmOrder);
router.put('/:id/cancel', orderController.cancelOrder);

module.exports = router;

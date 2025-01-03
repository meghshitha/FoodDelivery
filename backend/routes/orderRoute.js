const express = require('express');
const orderRouter = express.Router();
const {PlaceOrder, verifyOrder, userOrders, listOrders, updateState} =require('../controllers/orderController')
const authMiddleware = require('../middleware/auth');

orderRouter.post('/place',authMiddleware,PlaceOrder)
orderRouter.post('/verify',verifyOrder)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateState)
orderRouter.post('/userorders',authMiddleware,userOrders)

module.exports = orderRouter;
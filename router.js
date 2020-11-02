const router = require('express').Router();
const WarehouseController = require('./controller.js');

router.post('/carts', WarehouseController.createCart);
router.get('/carts', WarehouseController.getAllCarts);
router.get('/carts/:id', WarehouseController.getCartItems);
router.post('/warehouses', WarehouseController.calculateInput);
router.delete('/warehouses/:id', WarehouseController.deleteItems);

module.exports = router;

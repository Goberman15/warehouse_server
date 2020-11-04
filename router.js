const router = require('express').Router();
const WarehouseController = require('./controller.js');

router.get('/', (req, res) => {
    res.json({
        project: 'Warehouse'
    })
})
router.post('/carts', WarehouseController.createCart);
router.get('/carts', WarehouseController.getAllCarts);
router.get('/carts/:id', WarehouseController.getCartItems);
router.delete('/carts/:id', WarehouseController.deleteCart);
router.post('/warehouses', WarehouseController.calculateInput);
router.delete('/warehouses/:id', WarehouseController.deleteItems);

module.exports = router;

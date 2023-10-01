const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const shopControler = require('../controllers/shop')

router.get('/', productsController.getProducts);
router.get('/product/:id', productsController.getPKProducts);
router.get('/get-cart', shopControler.getCart)
router.post('/add-product-to-cart', shopControler.postAddCartProduct)
router.post('/edit-product-to-cart', shopControler.postEditCartProduct)
router.delete('/delete-product-on-cart', shopControler.deleteCartItem)
router.get('/delete-cart', shopControler.deleteCart)


module.exports = router;
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.post('/product',(req, res, next) => {
    console.log(req.body);
    res.redirect('/shop');
})

router.post('/edit-product',productsController.postEditProduct);
router.get('/edit-product/:id',productsController.getEditProducts);
router.post('/delete-product', productsController.postDeleteProduct);
router.post('/add-product',productsController.postAddProducts);
router.get('/get-user-products/:id', productsController.userProducts)

router.get('/ambil-product',(req, res, next) => {
    console.log(req.body)
    res.redirect("/shop")
})


module.exports = router;
Product = require('../models/products')

exports.getCart = (req, res, next) => {
    req.user.getCart().then(resultCart => {
        return resultCart.getProducts().then(
            products => {
                res.send(JSON.stringify(products))
            }
        ).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.postAddCartProduct = (req, res, next) => {
    // tambah cart item
    const prodId = req.body.productId
    Product.findByPk(prodId).then(resultProd => {
        req.user.getCart().then(mycart => {
            mycart.addProduct(resultProd).then(addResult => {
                res.send(JSON.stringify(addResult))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

exports.postEditCartProduct = (req, res, next) => {
    const productId = req.body.productId
    const qty = req.body.quantity
    const price = req.body.price

    req.user.getCart().then(mycart => {
        mycart.getProducts({
            where: {id: productId}
        }).then(results => {
            const result = results[0]
            if(!result){
                res.json({message:"Product tidak di temukan didalam cart"})
            }
            console.log(result)
            result.cartitems.quantity = qty
            result.cartitems.price = price
            result.cartitems.save().then(resSave => {
                res.send(JSON.stringify(resSave))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}


exports.deleteCartItem = (req, res, next) => {
    // delete cart item sesuai param.id dari cartItem
    const productId = req.body.productId

    req.user.getCart().then(resultCart => {
        resultCart.getProducts({
            where: {id: productId}
        }).then(resultsProd => {
            const result = resultsProd[0]
            if(!result){
                res.json({message:"Product tidak di temukan didalam cart"})
            }
            result.cartitems.destroy().then(resDestroy => {
                res.json({
                    data: resDestroy,
                    message:"Product sukses di hapus"})
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}


// exports.deleteCart = (req, res, next) => {


    // const productId = req.body.productId

//     req.user.getCart().then(resultCart => {
//         resultCart.getProducts({
//             // where: {id: productId}
//         }).then(resultProd => {
//             const result = resultProd[0]
//             for(let i in result) {
//                 // console.log(i);
//                 i = result
//                 result.destroy().then(resDestroy => {
//                     res.json({
//                         message:"Product sukses di hapus"})
//                 }).catch(err => console.log(err))
//             }
//         })
//     })
// }

exports.deleteCart = (req, res, next) => {
    
    req.user.getCart().then(resultCart => {
        resultCart.getProducts().then(resultsProd => {
            for(const prod of resultsProd) {
                prod.cartitems.destroy()
            }
        res.json({message: "keranjang sudah dihapus"})
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

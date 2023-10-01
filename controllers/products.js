const { Op } = require('sequelize');
const Product = require('../models/products');
const User = require('../models/user')
const products = [];

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const category = req.body.category;

    req.user.createProduct({
        title : title,
        price : price,
        imageUrl : imageUrl,
        description : description,
        category : category,
    }).then(result => {
    console.log(result.toJSON());
    console.log("Data berhasil ditambahkan");        
    }).catch(err => {
        console.log(err);
    })

    res.redirect("/shop")
}

exports.getProducts = (req, res, next) => {
    const query = req.query

    if(!query) {
        Product.findAll().then(result => {
            res.json({
                data : result,
                total : result.length
            }).catch(err => {
                console.log(err);
            })
        })
    }else{
        Product.findAll({
            where : {
                title : {[Op.like] : `%${query.title}%`}, 
                price : {[Op.gt] : `${query.price}`},
                [Op.or] : [
                    {category : "Kaos"},
                    {category : "Topi"},
                ]
                // gt artinya greater than
                // lt artinya less than
                // Op methodnya sequlize
            }
        }).then(result => {
            res.json({
                data : result,
                total : result.length
            })
        }).catch(err => {
            console.log(err);
        })
    }

}

exports.getPKProducts = (req, res, next) => {
    const prodId = req.params.id;
    Product.findByPk(prodId).then(result => {
        res.json({
            data : result,
            total : result.length
        }).catch(err => {
            console.log(err);
        })
    })
    }

exports.getEditProducts = (req, res, next) => {
    const prod_Id = req.params.id;
    req.user.getProducts(
        {where : {id : prod_Id}
    }).then(results => {
        const result = results[0]
        if(!result){
            return res.redirect('/shop')
        }

        res.send(JSON.stringify(result))
    }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
    const updateProdId = req.body.id;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImageUrl = req.body.imageUrl;
    const updateDescription = req.body.description;
    const updateCategory = req.body.category;

    Product.findByPk(updateProdId).then(result => {
        result.title = updateTitle;
        result.price = updatePrice;
        result.imageUrl = updateImageUrl;
        result.description = updateDescription;
        result.category = updateCategory;
        return result.save();
    }).then(resultSave => {
        console.log('product updated..')
        res.json(resultSave);
    }).catch(err => {
        console.log(err);
    })
}
exports.postDeleteProduct = (req, res, next) => {
    const deleteProdId = req.body.id;

    Product.findByPk(deleteProdId).then(result => {
        return result.destroy();
    }).then(resultDelete => {
        console.log('product deleted..')
        res.json(resultDelete);
    }).catch(err => {
        console.log(err);
    })
}


exports.userProducts = (req, res, next) => {
    const id = req.params.id;
    User.findAll({
        attributes: ['name', 'email'],
        where: {id : id},
        include: [
            {model: Product, attributes: ['title', 'price']}
        ]
    }).then( result => {
        res.send(JSON.stringify(result))
    }).catch(err => console.log(err))
}


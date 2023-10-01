const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const adminRoutes = require('./route/admin');
const shopRoutes = require('./route/shop');
const sequelize = require('./utils/database');
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart')
const CartItems = require('./models/cartItem')


app.use(bodyParser.urlencoded({
    extended: false
}));

// belongTo untuk menentukan User sebagai  yang utama
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through : CartItems})
Product.belongsToMany(Cart, {through : CartItems})

router.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((req, res, next) => {
    console.log("middle 1:", Date.now());
    User.findByPk(2).then(userFound => {
        req.user = userFound;
        next()
    }).catch(err => {
        console.log(err);
    })

});

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

router.get('/user/:userId', (req, res) => {
    res.send(req.method + ' ' + req.params.userId)
});

router.get('/print', (req, res) => {
    res.send()
})

router.use('/user/:userId', (req, res, next ) => {
    console.log("middle user :", req.params.userId);
    res.send(req.method + ' ' + req.params.userId)

});

app.use('/', router);

app.use((req, res, next) => {
    res.status(404).send(`<h1>Page Not Found</h1>`)
})


const koneksi = async() => {
    try {
        await sequelize.authenticate();
        console.log("database connected");
    } catch(error) {
        console.error("koneksi gagal", error);
    }
}

// koneksi();

sequelize.sync().then(result => {
 
    return User.findByPk(2);
}).then(userFound => {
   if (!userFound) {
        return User.create({
            name : 'Cok Bill',
            email : 'cok@com'
        })
    }
    return userFound;
}).then( myUser => {
    app.listen(8000);

}).catch(err => {
    console.log(err);
})



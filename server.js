const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Configurazione Porta (fondamentale per Code Engine)
const PORT = process.env.PORT || 8080;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key-eshop',
    resave: false,
    saveUninitialized: true
}));

// Database Mock (In produzione usa MongoDB o Cloudant)
const products = [
    { id: 1, name: "Smartphone X", price: 699, img: "https://via.placeholder.com/150" },
    { id: 2, name: "Laptop Pro", price: 1299, img: "https://via.placeholder.com/150" },
    { id: 3, name: "Cuffie Wireless", price: 199, img: "https://via.placeholder.com/150" }
];

// --- ROTTE ---

// Home Page: Lista Prodotti
app.get('/', (req, res) => {
    res.render('index', { products, cartCount: req.session.cart ? req.session.cart.length : 0 });
});

// Aggiunta al Carrello
app.post('/add-to-cart', (req, res) => {
    const productId = parseInt(req.body.productId);
    const product = products.find(p => p.id === productId);
    
    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);
    
    res.redirect('/');
});

// Checkout
app.get('/checkout', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render('checkout', { cart, total });
});

app.listen(PORT, () => {
    console.log(`E-commerce online sulla porta ${PORT}`);
});

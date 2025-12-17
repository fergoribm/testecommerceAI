const express = require('express');
const session = require('express-session');
const app = express();

const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configurazione Sessione (Fondamentale per il carrello)
app.use(session({
    secret: 'it-shop-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Imposta a true se usi HTTPS su Code Engine
}));

// Catalogo Oggetti IT
const products = [
    { 
        id: 1, 
        name: "Monitor Gaming 27\" 4K", 
        price: 450.00, 
        img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        desc: "Pannello IPS, 144Hz, tempo di risposta 1ms."
    },
    { 
        id: 2, 
        name: "Tastiera Meccanica RGB", 
        price: 120.00, 
        img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
        desc: "Switch Cherry MX Red, layout italiano."
    },
    { 
        id: 3, 
        name: "Notebook Extraslim IBM Z17", 
        price: 1899.00, 
        //img: "https://images.unsplash.com/photo-1517336714460-457228377a7e?w=500",
        //img: "https://unsplash.com/photos/futuristic-server-room-lit-with-blue-lights-CuZ8VdwRpyk?w=500",
        img: "https://unsplash.com/it/foto/una-stanza-che-ha-un-sacco-di-lavatrici-in-esso-pMfknWCbG5c?w=500",
        desc: "16TB RAM, 512TB SSD, display: Un led blu."
    },
    { 
        id: 4, 
        name: "Mouse Wireless Ergonomico", 
        price: 85.00, 
        img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        desc: "Sensore 16000 DPI, batteria a lunga durata."
    },
    { 
        id: 5, 
        name: "SSD Esterno 2TB", 
        price: 160.00, 
        img: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?w=500",
        desc: "Velocità di trasferimento fino a 1050 MB/s."
    }
];

app.get('/', (req, res) => {
    const cart = req.session.cart || [];
    res.render('index', { products, cartCount: cart.length });
});

app.post('/add-to-cart', (req, res) => {
    const productId = parseInt(req.body.productId);
    const product = products.find(p => p.id === productId);
    if (!req.session.cart) req.session.cart = [];
    req.session.cart.push(product);
    res.redirect('/');
});

app.get('/checkout', (req, res) => {
    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    res.render('checkout', { cart, total });
});

app.listen(PORT, () => {
    console.log(`Server IT Shop attivo su porta ${PORT}`);
});

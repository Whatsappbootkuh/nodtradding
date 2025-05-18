const express = require('express');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Currency pairs with exchange-specific symbols
const pairs = {
    'BTC/USDT': { binance: 'BTCUSDT', kucoin: 'BTC-USDT', bingx: 'BTC-USDT' },
    'ETH/USDT': { binance: 'ETHUSDT', kucoin: 'ETH-USDT', bingx: 'ETH-USDT' },
    'BCH/USDT': { binance: 'BCHUSDT', kucoin: 'BCH-USDT', bingx: 'BCH-USDT' },
    'LINK/USDT': { binance: 'LINKUSDT', kucoin: 'LINK-USDT', bingx: 'LINK-USDT' },
    'UNI/USDT': { binance: 'UNIUSDT', kucoin: 'UNI-USDT', bingx: 'UNI-USDT' },
    'YFI/USDT': { binance: 'YFIUSDT', kucoin: 'YFI-USDT', bingx: 'YFI-USDT' },
    'EOS/USDT': { binance: 'EOSUSDT', kucoin: 'EOS-USDT', bingx: 'EOS-USDT' },
    'DOT/USDT': { binance: 'DOTUSDT', kucoin: 'DOT-USDT', bingx: 'DOT-USDT' },
    'FIL/USDT': { binance: 'FILUSDT', kucoin: 'FIL-USDT', bingx: 'FIL-USDT' },
    'ADA/USDT': { binance: 'ADAUSDT', kucoin: 'ADA-USDT', bingx: 'ADA-USDT' },
    'XRP/USDT': { binance: 'XRPUSDT', kucoin: 'XRP-USDT', bingx: 'XRP-USDT' },
    'LTC/USDT': { binance: 'LTCUSDT', kucoin: 'LTC-USDT', bingx: 'LTC-USDT' },
    'TRX/USDT': { binance: 'TRXUSDT', kucoin: 'TRX-USDT', bingx: 'TRX-USDT' },
    'DOGE/USDT': { binance: 'DOGEUSDT', kucoin: 'DOGE-USDT', bingx: 'DOGE-USDT' },
    'ALGO/USDT': { binance: 'ALGOUSDT', kucoin: 'ALGO-USDT', bingx: 'ALGO-USDT' },
    'ATOM/USDT': { binance: 'ATOMUSDT', kucoin: 'ATOM-USDT', bingx: 'ATOM-USDT' }
};

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        return res.redirect('/index.html');
    }
    next();
};

// Login endpoint
app.post('/login', (req, res) => {
    const { code } = req.body;
    if (code === 'master') {
        req.session.logged_in = true;
        return res.json({ success: true });
    }
    res.status(401).json({ error: 'الكود غير صحيح' });
});

// Prices endpoint
app.get('/prices', requireAuth, async (req, res) => {
    try {
        const prices = {};
        const requests = [];

        for (const [pair, symbols] of Object.entries(pairs)) {
            requests.push(
                axios.get(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbols.binance}`)
                    .then(res => ({ pair, exchange: 'binance', price: parseFloat(res.data.price) }))
                    .catch(err => ({ pair, exchange: 'binance', error: err.message })),

                axios.get(`https://api-futures.kucoin.com/api/v1/mark-price/${symbols.kucoin}/current`)
                    .then(res => ({ pair, exchange: 'kucoin', price: parseFloat(res.data.data.value) }))
                    .catch(err => ({ pair, exchange: 'kucoin', error: err.message })),

                axios.get(`https://open-api.bingx.com/openApi/spot/v1/ticker/price?symbol=${symbols.bingx}`)
                    .then(res => ({ pair, exchange: 'bingx', price: parseFloat(res.data.data.price) }))
                    .catch(err => ({ pair, exchange: 'bingx', error: err.message }))
            );
        }

        const results = await Promise.all(requests);

        for (const result of results) {
            if (!prices[result.pair]) prices[result.pair] = {};
            if (result.error) {
                prices[result.pair][`${result.exchange}_error`] = result.error;
            } else {
                prices[result.pair][result.exchange] = result.price;
            }
        }

        res.json(prices);
    } catch (error) {
        res.status(500).json({ error: 'خطأ أثناء جلب الأسعار', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
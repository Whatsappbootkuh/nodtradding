// Application state
const appData = {
    coins: {},
    availableSymbols: [
        'BTC/USDT', 'ETH/USDT', 'BCH/USDT', 'LINK/USDT', 'UNI/USDT',
        'YFI/USDT', 'EOS/USDT', 'DOT/USDT', 'FIL/USDT', 'ADA/USDT',
        'XRP/USDT', 'LTC/USDT', 'TRX/USDT', 'DOGE/USDT', 'ALGO/USDT', 'ATOM/USDT'
    ],
    notifications: [],
    currentLang: 'ar',
    isDarkTheme: true
};

// Translations
const translations = {
    ar: {
        searchPlaceholder: "ابحث عن عملة (BTC, ETH...)",
        currency: "العملة",
        binance: "Binance Futures",
        kucoin: "KuCoin Futures",
        bingx: "BingX",
        difference: "الفرق",
        percentage: "النسبة",
        totalCoins: "عدد العملات",
        maxDiff: "أعلى فرق",
        minDiff: "أدنى فرق",
        avgDiff: "متوسط الفرق",
        lastUpdated: "آخر تحديث:",
        now: "الآن",
        footer1: "© 2025 مقارنة الأسعار بين Binance و KuCoin و BingX | جميع الحقوق محفوظة",
        footer2: "هذه الأداة للأغراض الإعلامية فقط وليست نصيحة مالية",
        noResults: "لا توجد نتائج مطابقة للبحث",
        connectionError: "خطأ في الاتصال بالخادم. جاري إعادة المحاولة...",
        rateLimitError: "تم تجاوز حد طلبات الـ API. يرجى الانتظار قليلاً...",
        invalidSymbolError: "رمز غير صالح لـ",
        notification: "فرق سعر كبير في"
    },
    fr: {
        searchPlaceholder: "Rechercher une crypto (BTC, ETH...)",
        currency: "Crypto",
        binance: "Binance Futures",
        kucoin: "KuCoin Futures",
        bingx: "BingX",
        difference: "Différence",
        percentage: "Pourcentage",
        totalCoins: "Total cryptos",
        maxDiff: "Max différence",
        minDiff: "Min différence",
        avgDiff: "Moyenne différence",
        lastUpdated: "Dernière mise à jour:",
        now: "Maintenant",
        footer1: "© 2025 Comparaison des prix Binance vs KuCoin vs BingX | Tous droits réservés",
        footer2: "Cet outil est à titre informatif uniquement et ne constitue pas un conseil financier",
        noResults: "Aucun résultat trouvé",
        connectionError: "Erreur de connexion au serveur. Reconnexion...",
        rateLimitError: "Limite de requêtes API dépassée. Veuillez patienter...",
        invalidSymbolError: "Symbole invalide pour",
        notification: "Différence de prix importante pour"
    },
    en: {
        searchPlaceholder: "Search for a coin (BTC, ETH...)",
        currency: "Currency",
        binance: "Binance Futures",
        kucoin: "KuCoin Futures",
        bingx: "BingX",
        difference: "Difference",
        percentage: "Percentage",
        totalCoins: "Total Coins",
        maxDiff: "Max Difference",
        minDiff: "Min Difference",
        avgDiff: "Avg Difference",
        lastUpdated: "Last updated:",
        now: "Now",
        footer1: "© 2025 Price Comparison Binance vs KuCoin vs BingX | All Rights Reserved",
        footer2: "This tool is for informational purposes only and not financial advice",
        noResults: "No matching results found",
        connectionError: "Connection error. Reconnecting...",
        rateLimitError: "API request limit exceeded. Please wait...",
        invalidSymbolError: "Invalid symbol for",
        notification: "Significant price difference for"
    },
    ma: {
        searchPlaceholder: "Searchi 3la crypto (BTC, ETH...)",
        currency: "Crypto",
        binance: "Binance Futures",
        kucoin: "KuCoin Futures",
        bingx: "BingX",
        difference: "Lfar9",
        percentage: "Lmiya",
        totalCoins: "S7ab lcoins",
        maxDiff: "A3la far9",
        minDiff: "A9al far9",
        avgDiff: "Moyenne dyal far9",
        lastUpdated: "A5er update:",
        now: "Daba",
        footer1: "© 2025 Comparaison Binance vs KuCoin vs BingX | Reserved",
        footer2: "Had tool kayna b7al info w machi conseil financier",
        noResults: "Ma kayn chi résultat",
        connectionError: "Erreur de connexion. Reconnecting...",
        rateLimitError: "Limite dyal API tzadet. Tsenna chwiya...",
        invalidSymbolError: "Symbol machi valid l",
        notification: "Far9 kbir f lprix l"
    }
};

// Initialize coins data
appData.availableSymbols.forEach(symbol => {
    appData.coins[symbol] = {
        symbol,
        binance: null,
        kucoin: null,
        bingx: null,
        difference: null,
        percentage: null
    };
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    appData.isDarkTheme = !appData.isDarkTheme;
    document.body.classList.toggle('light');
    document.getElementById('themeToggle').innerHTML = appData.isDarkTheme ?
        '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Language switcher
document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.language-btn.active').classList.remove('active');
        btn.classList.add('active');
        changeLanguage(btn.getAttribute('data-lang'));
    });
});

function changeLanguage(lang) {
    appData.currentLang = lang;
    const trans = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ma' ? 'rtl' : 'ltr';

    document.getElementById('searchInput').placeholder = trans.searchPlaceholder;
    document.querySelector('.table-header div:nth-child(1)').textContent = trans.currency;
    document.querySelector('.table-header div:nth-child(2)').textContent = trans.binance;
    document.querySelector('.table-header div:nth-child(3)').textContent = trans.kucoin;
    document.querySelector('.table-header div:nth-child(4)').textContent = trans.bingx;
    document.querySelector('.table-header div:nth-child(5)').textContent = trans.difference;
    document.querySelector('.table-header div:nth-child(6)').textContent = trans.percentage;

    document.querySelector('.stat-card:nth-child(1) h3').textContent = trans.totalCoins;
    document.querySelector('.stat-card:nth-child(2) h3').textContent = trans.maxDiff;
    document.querySelector('.stat-card:nth-child(3) h3').textContent = trans.minDiff;
    document.querySelector('.stat-card:nth-child(4) h3').textContent = trans.avgDiff;

    document.querySelector('.last-updated').innerHTML = `${trans.lastUpdated} <span id="updateTime">${trans.now}</span>`;
    document.querySelector('footer').innerHTML = `<p>${trans.footer1}</p><p>${trans.footer2}</p>`;

    displayData(Object.values(appData.coins));
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', searchCoins);
document.getElementById('searchInput').addEventListener('keyup', e => {
    if (e.key === 'Enter') searchCoins();
});

function searchCoins() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredCoins = appData.availableSymbols
        .filter(symbol => symbol.toLowerCase().includes(searchTerm))
        .map(symbol => appData.coins[symbol]);
    displayData(filteredCoins);
}

// Display coin data
function displayData(coins) {
    const coinsData = document.getElementById('coinsData');
    coinsData.innerHTML = '';

    if (coins.length === 0) {
        coinsData.innerHTML = `
            <div class="table-row" style="text-align: center; grid-column: 1 / span 6; padding: 30px;">
                <p>${translations[appData.currentLang].noResults}</p>
            </div>`;
        updateStats([]);
        return;
    }

    coins.forEach(coin => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.id = `row-${coin.symbol.replace('/', '')}`;

        const diffClass = coin.difference > 0 ? 'positive' : coin.difference < 0 ? 'negative' : 'neutral';
        const percClass = coin.percentage > 0 ? 'positive' : coin.percentage < 0 ? 'negative' : 'neutral';

        row.innerHTML = `
            <div class="coin" data-label="${translations[appData.currentLang].currency}">
                <img src="https://cryptologos.cc/logos/${coin.symbol.split('/')[0].toLowerCase()}-${coin.symbol.split('/')[0].toLowerCase()}-logo.png" 
                     alt="${coin.symbol.split('/')[0]}" 
                     onerror="this.src='https://cryptologos.cc/logos/bnb-bnb-logo.png'">
                <span>${coin.symbol}</span>
            </div>
            <div id="binance-${coin.symbol.replace('/', '')}" data-label="${translations[appData.currentLang].binance}">
                ${coin.binance ? `$${coin.binance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-'}
            </div>
            <div id="kucoin-${coin.symbol.replace('/', '')}" data-label="${translations[appData.currentLang].kucoin}">
                ${coin.kucoin ? `$${coin.kucoin.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-'}
            </div>
            <div id="bingx-${coin.symbol.replace('/', '')}" data-label="${translations[appData.currentLang].bingx}">
                ${coin.bingx ? `$${coin.bingx.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-'}
            </div>
            <div id="diff-${coin.symbol.replace('/', '')}" class="${diffClass}" data-label="${translations[appData.currentLang].difference}">
                ${coin.difference ? (coin.difference > 0 ? '+' : '') + '$' + Math.abs(coin.difference).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8}) : '-'}
            </div>
            <div id="perc-${coin.symbol.replace('/', '')}" class="${percClass}" data-label="${translations[appData.currentLang].percentage}">
                ${coin.percentage ? (coin.percentage > 0 ? '+' : '') + coin.percentage.toFixed(2) + '%' : '-'}
            </div>`;
        coinsData.appendChild(row);
    });

    updateStats(coins);
}

// Update statistics
function updateStats(coins) {
    document.getElementById('totalCoins').textContent = coins.length;

    if (coins.length === 0) {
        document.getElementById('maxDiff').textContent = '-';
        document.getElementById('minDiff').textContent = '-';
        document.getElementById('avgDiff').textContent = '-';
        return;
    }

    const percentages = coins.map(coin => coin.percentage || 0).filter(perc => !isNaN(perc));
    const maxDiff = percentages.length ? Math.max(...percentages) : 0;
    const minDiff = percentages.length ? Math.min(...percentages) : 0;
    const avgDiff = percentages.length ? percentages.reduce((a, b) => a + b, 0) / percentages.length : 0;

    document.getElementById('maxDiff').textContent = `${maxDiff > 0 ? '+' : ''}${maxDiff.toFixed(2)}%`;
    document.getElementById('maxDiff').className = maxDiff > 0 ? 'positive' : maxDiff < 0 ? 'negative' : 'neutral';

    document.getElementById('minDiff').textContent = `${minDiff > 0 ? '+' : ''}${minDiff.toFixed(2)}%`;
    document.getElementById('minDiff').className = minDiff > 0 ? 'positive' : minDiff < 0 ? 'negative' : 'neutral';

    document.getElementById('avgDiff').textContent = `${avgDiff > 0 ? '+' : ''}${avgDiff.toFixed(2)}%`;
    document.getElementById('avgDiff').className = avgDiff > 0 ? 'positive' : avgDiff < 0 ? 'negative' : 'neutral';
}

// Update time
function updateTime() {
    const now = new Date();
    document.getElementById('updateTime').textContent = now.toLocaleTimeString();
}

// Add notification
function addNotification(message) {
    const id = Date.now();
    appData.notifications.push({ id, message });

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        ${message}
        <span class="notification-close" onclick="removeNotification(${id})">✕</span>`;
    document.body.appendChild(notification);

    setTimeout(() => removeNotification(id), 5000);
}

function removeNotification(id) {
    appData.notifications = appData.notifications.filter(n => n.id !== id);
    const notification = document.querySelector(`.notification .notification-close[onclick="removeNotification(${id})"]`);
    if (notification) notification.parentElement.remove();
}

// Update coin price
function updateCoinPrice(symbol, exchange, price) {
    if (!appData.coins[symbol]) return;

    appData.coins[symbol][exchange] = price;

    if (appData.coins[symbol].binance && appData.coins[symbol].kucoin && appData.coins[symbol].bingx) {
        const prices = [appData.coins[symbol].binance, appData.coins[symbol].kucoin, appData.coins[symbol].bingx];
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        appData.coins[symbol].difference = appData.coins[symbol].binance - avgPrice;
        appData.coins[symbol].percentage = ((appData.coins[symbol].binance - avgPrice) / avgPrice) * 100;

        if (Math.abs(appData.coins[symbol].percentage) > 2) {
            addNotification(`${translations[appData.currentLang].notification} ${symbol}: ${appData.coins[symbol].percentage.toFixed(2)}%`);
        }
    }

    updateCoinUI(symbol);
    updateTime();
}

// Update coin UI
function updateCoinUI(symbol) {
    const coin = appData.coins[symbol];
    if (!coin) return;

    const binanceElement = document.getElementById(`binance-${symbol.replace('/', '')}`);
    const kucoinElement = document.getElementById(`kucoin-${symbol.replace('/', '')}`);
    const bingxElement = document.getElementById(`bingx-${symbol.replace('/', '')}`);
    const diffElement = document.getElementById(`diff-${symbol.replace('/', '')}`);
    const percElement = document.getElementById(`perc-${symbol.replace('/', '')}`);
    const rowElement = document.getElementById(`row-${symbol.replace('/', '')}`);

    if (binanceElement) {
        binanceElement.textContent = coin.binance ? `$${coin.binance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-';
    }

    if (kucoinElement) {
        kucoinElement.textContent = coin.kucoin ? `$${coin.kucoin.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-';
    }

    if (bingxElement) {
        bingxElement.textContent = coin.bingx ? `$${coin.bingx.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}` : '-';
    }

    if (diffElement && coin.difference !== null) {
        const diffClass = coin.difference > 0 ? 'positive' : coin.difference < 0 ? 'negative' : 'neutral';
        diffElement.className = diffClass;
        diffElement.textContent = `${coin.difference > 0 ? '+' : ''}$${Math.abs(coin.difference).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 8})}`;
    }

    if (percElement && coin.percentage !== null) {
        const percClass = coin.percentage > 0 ? 'positive' : coin.percentage < 0 ? 'negative' : 'neutral';
        percElement.className = percClass;
        percElement.textContent = `${coin.percentage > 0 ? '+' : ''}${coin.percentage.toFixed(2)}%`;
    }

    if (rowElement) {
        rowElement.classList.add('highlight');
        setTimeout(() => rowElement.classList.remove('highlight'), 1000);
    }

    updateStats(Object.values(appData.coins));
}

// Fetch prices
async function fetchAllPrices() {
    try {
        const response = await fetch('/prices');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        for (const symbol in data) {
            if (data[symbol].binance_error) {
                console.error(`خطأ Binance Futures لـ ${symbol}: ${data[symbol].binance_error}`);
                if (data[symbol].binance_error.includes('429')) {
                    addNotification(translations[appData.currentLang].rateLimitError);
                }
            } else if (data[symbol].binance) {
                updateCoinPrice(symbol, 'binance', data[symbol].binance);
            }

            if (data[symbol].kucoin_error) {
                console.error(`خطأ KuCoin Futures لـ ${symbol}: ${data[symbol].kucoin_error}`);
                if (data[symbol].kucoin_error.includes('429')) {
                    addNotification(translations[appData.currentLang].rateLimitError);
                }
            } else if (data[symbol].kucoin) {
                updateCoinPrice(symbol, 'kucoin', data[symbol].kucoin);
            }

            if (data[symbol].bingx_error) {
                console.error(`خطأ BingX لـ ${symbol}: ${data[symbol].bingx_error}`);
                if (data[symbol].bingx_error.includes('429')) {
                    addNotification(translations[appData.currentLang].rateLimitError);
                }
            } else if (data[symbol].bingx) {
                updateCoinPrice(symbol, 'bingx', data[symbol].bingx);
            }
        }
    } catch (error) {
        console.error('خطأ في جلب الأسعار:', error);
        const coinsData = document.getElementById('coinsData');
        coinsData.innerHTML = `
            <div class="table-row error-message" style="grid-column: 1 / span 6; padding: 30px;">
                <p>${translations[appData.currentLang].connectionError}: ${error.message}</p>
            </div>`;
    }
}

// Initialize application
async function init() {
    updateTime();
    displayData(Object.values(appData.coins));
    await fetchAllPrices();
    setInterval(fetchAllPrices, 2000);
    setInterval(updateTime, 1000);
}

window.addEventListener('DOMContentLoaded', init);
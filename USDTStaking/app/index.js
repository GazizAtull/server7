const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const index = express();
const port = process.env.PORT || 9001;

index.use(bodyParser.json());
index.use(cors({ origin: '*' }));

// Изначальные значения на сервере
let usdtInfo = 0;
let balanceInfo = 0;
let canDedInfo = 0;

index.get('/api/info', (req, res) => {
    res.json({ usdtInfo, balanceInfo, canDedInfo });
});

index.post('/api/update', (req, res) => {
    balanceInfo += 10;
    canDedInfo += 10;
    usdtInfo += 10;
    res.json({ usdtInfo, balanceInfo, canDedInfo });
});

index.post('/send-to-wallet', (req, res) => {
    const walletAddress = req.body.address;
    const amount = req.body.amount;

    if (!walletAddress) {
        return res.status(400).json({ success: false, message: 'Адрес кошелька не указан.' });
    }

    if (canDedInfo >= 20 && canDedInfo >= amount) {
        balanceInfo -= amount;
        canDedInfo -= amount;
        res.json({ success: true, message: `Средства успешно отправлены на адрес: ${walletAddress}.`, balanceInfo, canDedInfo });
    } else {
        res.json({ success: false, message: 'Недостаточно средств для списания.' });
    }
});

index.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

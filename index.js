const express = require('express');
const app = express();
const port = 3000;
const baseUrl = process.env.URL_BASE;

app.use(express.json());

const formatDate = () => {
    const today = new Date();
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    return `${day}-${month}-${today.getFullYear()}`;
}

app.get('/random', async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) res.status(500).json(false);
        else res.status(200).json(true);
    } catch (error) {
        console.log(error);
    }
});

app.get('/:currencyType', async (req, res) => {
    try {
        const formattedDate = formatDate();
        const url = baseUrl + "/" + req.params.currencyType + "/" + formattedDate;
        const getSeries = await fetch(url);
        const data = await getSeries.json();
        res.json(data.serie[0].valor);
    } catch (error) {
        console.log(error);
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

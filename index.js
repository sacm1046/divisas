const express = require('express');
const app = express();
const port = 3000;
const baseUrl = process.env.URL_BASE;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/:currencyType/:date', async (req, res) => {
    const url = baseUrl + "/" + req.params.currencyType + "/" + req.params.date;
    const getSeries = await fetch(url);
    const data = await getSeries.json(); 
    res.json(data.serie[0].valor);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;
const baseUrl = process.env.URL_BASE;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/:currencyType', async (req, res) => {
    const url = baseUrl + "/" + req.params.currencyType;

    console.log(url)
    const getSeries = await fetch(url);
    const series = await getSeries.json(); 
    res.json({ message: 'Hola Mundo', series });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

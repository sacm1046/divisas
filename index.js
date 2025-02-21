const express = require('express');
const app = express();
const port = 3000;
const baseUrl = process.env.BASE_URL || '/';
const user = process.env.USER;
const pass = process.env.PASS;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', async (req, res) => {
    const url = baseUrl + '?user='+user+'@ejemplo.com&pass='+pass+'&function=GetSeries%C3%97eries=F022.TPM.TIN.D001.NO.Z.D&firstdate=2025-02-21&lastdate=2025-02-21'
    console.log(url)

    const getSeries = await fetch(url);
    const series = await getSeries.json();


    res.json({ message: 'Hola Mundo', series });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

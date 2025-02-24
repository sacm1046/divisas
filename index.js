const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/random', async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 2);
        if (random === 0) res.status(500).json(false);
        else res.status(200).json(true);
    } catch (error) {
        console.log(error);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

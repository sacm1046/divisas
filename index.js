import express from "express";
import Redis from "ioredis";

const baseUrl = process.env.URL_BASE;
const redisUrl = process.env.REDIS_URL;

const redis = new Redis(redisUrl);
const app = express();
const port = 3000;

app.use(express.json());

const storeData = async (data) => {
    try {
        return await redis.set("currencies", JSON.stringify(data));
    } catch (error) {
        console.log(error);
        return;
    }
}

app.get('/read', async (req, res) => {
    try {
        const data = await redis.get("currencies");
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(null);
    }
});

app.get('/currencies', async (req, res) => {
    try {
        const url = baseUrl + "/";
        const currencies = await fetch(url);
        const data = await currencies.json();
        await storeData(data)
        res.status(200).json("OK");
    } catch (error) {
        res.status(500).json(null);
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

import express from "express";
import redis from "./helpers/redis.js";
import lowdb from "./helpers/lowdb.js";
import { formatData } from "./helpers/format-data.js";

const baseUrl = process.env.URL_BASE;
const app = express();
const port = 3000;

app.use(express.json());

const getCurrencies = async () => {
    try {
        const url = baseUrl + "/";
        const currencies = await fetch(url);
        return formatData(await currencies.json());
    } catch (error) {
        console.log(error);
    }
}

app.get('/read/redis', async (req, res) => {
    try {
        const data = await redis.getData("currencies");
        res.status(200).json(JSON.parse(data));
    } catch (error) {
        console.log(error);
        res.status(500).json(null);
    }
});

app.get('/read/json', async (req, res) => {
    try {
        const data = await lowdb.getData()
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(null);
    }
});

app.get('/currencies/redis', async (req, res) => {
    try {
        const currencies = await getCurrencies()
        await redis.storeData("currencies", currencies)
        res.status(200).json("OK");
    } catch (error) {
        res.status(500).json(null);
    }
});

app.get('/currencies/json', async (req, res) => {
    try {
        const currencies = await getCurrencies()
        await lowdb.storeData(currencies)
        res.status(200).json("OK");
    } catch (error) {
        console.log(error);
        res.status(500).json(null);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

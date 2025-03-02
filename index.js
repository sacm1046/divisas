import express from "express";
import { storeData, getData } from "./helpers/redis.js";
import { formatData } from "./helpers/format-data.js";

const baseUrl = process.env.URL_BASE;

const app = express();
const port = 3000;

app.use(express.json());

app.get('/read', async (req, res) => {
    try {
        const data = await getData("currencies");
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
        const formatted = formatData(data);
        await storeData("currencies", formatted)
        res.status(200).json("OK");
    } catch (error) {
        res.status(500).json(null);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

import Redis from "ioredis";
const redisUrl = process.env.REDIS_URL;
const redis = new Redis(redisUrl);

const storeData = async (key, data) => {
    try {
        return await redis.set("currencies", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

const getData = async (key) => {
    try {
        return await redis.get(key);
    } catch (error) {
        console.log(error);
    }
}

export default {
    getData,
    storeData
}
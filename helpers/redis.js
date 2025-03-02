import Redis from "ioredis";
const redisUrl = process.env.REDIS_URL;
const redis = new Redis(redisUrl);

export const storeData = async (key, data) => {
    try {
        return await redis.set("currencies", JSON.stringify(data));
    } catch (error) {
        console.log(error);
        return;
    }
}

export const getData = async (key) => {
    try {
        return await redis.get(key);
    } catch (error) {
        console.log(error);
        return;
    }
}
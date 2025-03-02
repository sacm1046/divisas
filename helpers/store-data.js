export const storeData = async (data) => {
    try {
        return await redis.set("currencies", JSON.stringify(data));
    } catch (error) {
        console.log(error);
        return;
    }
}
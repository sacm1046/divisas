import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import fs from "fs/promises";
const jsonPath = path.join(process.cwd(), "db/db.json");

const jsonDb = new Low(new JSONFile("db/db.json"), {});
/** 
 * Si deseo que se sigan agregando elementos al archivo JSON para el caso de un array, debo descomentar las siguiente línea
 * await jsonDb.read();
*/

const storeData = async (data) => {
    try {
        /** 
         * para trabajar con arrays usar jsonDb.data.push({ key: object })
        */
        jsonDb.data = data;
        await jsonDb.write();
    } catch (error) {
        console.log(error);
    }
}

const getData = async () => {
    try {
        const data = await fs.readFile(jsonPath, "utf-8");
    return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

export default {
    getData,
    storeData
}
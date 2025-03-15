import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

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
        await jsonDb.read();
        return jsonDb.data;
    } catch (error) {
        console.log(error);
    }
}

export default {
    getData,
    storeData
}
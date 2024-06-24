import { MongoDBConnection } from "./conectionClass.js";

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'productsdb';
const collectionName = 'products';



export async function consultarProductos() {
    const dbConnection = new MongoDBConnection(url, dbName);
    try {
        await dbConnection.connect();
        const collection = dbConnection.getCollection(collectionName);

        const documentos = await collection.find({}).toArray();
        return documentos;
        //console.log('Documentos encontrados:', documentos);
    } catch (error) {
        console.error('Error al consultar productos:', error);
    } finally {
        await dbConnection.close();
    }
}

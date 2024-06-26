// Importar el módulo MongoDB
import { MongoClient } from 'mongodb';
// URL de conexión a MongoDB (por defecto, MongoDB se ejecuta en localhost:27017)
const url = 'mongodb://127.0.0.1:27017';
// Nombre de la base de datos
const dbName = 'productsdb';
//nombre de la coleccion
const collectionName = 'products';

import { ObjectId } from 'mongodb';

// Crear un cliente de MongoDB
//const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Conectar al servidor de MongoDB

// Conectar al servidor de MongoDB
export async function consultarDocumentos() {
    let client;

    try {
        client = new MongoClient(url);
        await client.connect();

        console.log('Conexión exitosa a MongoDB');

        const id = "667727f583c2e127893bab3b";
        const objectId = new ObjectId(id);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.findOne({_id:objectId});
        //const documents = await collection.find({year:2055}).toArray();

        //console.log('Documentos encontrados:', documents);
        return documents;
    } catch (error) {
        console.error('Error al obtener documentos de la colección:', error);
        throw error;
    } finally {


        if (client) {
            await client.close();
        }
    }
}
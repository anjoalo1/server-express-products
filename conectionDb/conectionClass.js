// MongoDBConnection.js

import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'productsdb';
const collectionName = 'products';

export class MongoDBConnection {
    constructor(url, dbName) {
        this.url = url;
        this.dbName = dbName;
        this.client = new MongoClient(this.url);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log(`Conexión exitosa a MongoDB en ${this.url}`);
            this.db = this.client.db(this.dbName);
        } catch (error) {/* console.error('Error al conectar a MongoDB:', error); */throw error;}
    }

    async close() {
        try {
            await this.client.close();
            console.log('Conexión cerrada correctamente');
        } catch (error) {
            console.error('Error al cerrar la conexión a MongoDB:', error);
            throw error;
        }
    }

    getCollection(collectionName) {
        if (!this.db) {
            throw new Error('No se ha establecido la conexión a MongoDB');
        }
        return this.db.collection(collectionName);
    }

    static async createConection(){
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


    // recuperar todos los documentos de una base de datos

    static async getAllDocuments(){
        const dbConnection = new MongoDBConnection(url, dbName);
        
        try {
            await dbConnection.connect();
            return  collection = dbConnection.getCollection(collectionName).find({}).toArray();
            //return  documentos = await collection.find({}).toArray();
            //return documentos;
            //console.log('Documentos encontrados:', documentos);
        } catch (error) {
            console.error('Error al consultar productos:', error);
        } finally {
            await dbConnection.close();
        }
    }

    static async getProductById({id}){
        const dbConnection = new MongoDBConnection(url, dbName);
        try{
            await dbConnection.connect();
            const collection = await dbConnection.getCollection(collectionName).findOne({id:id});
            if(collection)return collection;
            else return false;

        }catch(error){console.log('error al consultar producto')}finally{
            await dbConnection.close();
        }
    }
}
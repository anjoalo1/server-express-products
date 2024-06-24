import { MongoDBConnectionModel } from "../models/productsMongoModel.js";
import { productEschema, validateProduct, validatePartialProduct } from '../scheemes/productScheme.js';
import { MongoClient } from 'mongodb';


export class productsControllerMongo{

    static async getAll(req, res){

        const getAllProducts = await MongoDBConnectionModel.getAllDocuments();
        res.status(400).json(getAllProducts);
    }

    static async getProductById(req, res){
        const {id} = req.params;
        const getProduct = await MongoDBConnectionModel.getProductById({id});
        if(getProduct===false) return res.status(404).json({message:"Product not found"})
            else return res.status(400).json(getProduct);
    }

    //crear un producto con post
    static async createProduct(req, res){
        const result  = validateProduct(req.body) 

        if(!result.success)return res.status(404).json({error:JSON.parse(result.error.message)})
            else{
                const saveProduct = await MongoDBConnectionModel.createProduct({input:result.data});
                res.status(401).json({message:"ProductCreate", product: saveProduct});
            }
    }


    //borrar un producto deacuerdo a su id

    static async deleteProductById(req, res){
        const {id} = req.params;
        const deleteProduct = await MongoDBConnectionModel.deleteProductById({id})
            if(deleteProduct===false) return res.status(404).json({message:"Product not found"})
                else return res.status(400).json({message:"Product deleted"});
        }
    
}
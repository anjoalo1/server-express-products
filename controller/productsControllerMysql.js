import { ModelMysql } from "../models/productsModelMysql.js";
import { productEschema, validateProduct, validatePartialProduct } from '../scheemes/productScheme.js';


export class ControllerMysql{

    static async getAll(req, res) {

        const { genre } =req.query;

        
        const getAllProducts = await ModelMysql.getAllProducts({genre});
        if(getAllProducts)return res.status(400).json(getAllProducts);
            else return res.status(404).json({message:"Products not found"});
        
    }

    static async getProductById(req, res){
        const {id} =req.params;

        const getProductById = await ModelMysql.getProductById({id});
        if(getProductById) return res.status(400).json(getProductById);
        else return res.status(404).json({message: "Product not found"}) 

    }

    static async updateProduct (req, res){
        const result =  validatePartialProduct(req.body);
        //console.log(result.data.title, result.data.year)
        if(!result.success){
            return res.status(404).json({error: JSON.parse(result.error.message)})
        }

        const { id } = req.params;

        const updateProductMysql = await ModelMysql.updateProduct({id, input:result.data})
        if(updateProductMysql===false){
            return res.status(404).json({error: "Product not found"})
        }else return res.status(401).json({message: "Product updated"})
    }
}
import { ProductsModel } from "../models/productsModel.js";
import { productEschema, validateProduct, validatePartialProduct } from '../scheemes/productScheme.js';

export class ProductsController{

    static async getAll(req, res){
        const allProducts= await ProductsModel.getAll();
        res.status(400).json(allProducts);
    }

    static async getProductById(req, res){
     const {id} = req.params;
     const buscar = await ProductsModel.getProductById({id})
     if(buscar===false)return res.status(404).json({message:"movie not found"})
        else return res.status(400).json(buscar)
    
    }

    static async createProduct(req, res){
        console.log(req.body);
        const result =  validateProduct(req.body);

        if(!result.success){
            return res.status(404).json({error: JSON.parse(result.error.message)})
        }else{
            const create = await ProductsModel.createProduct(result);
            res.status(404).json(create);
        }
    }

    static async updateProduct(req, res){
        const result = validatePartialProduct(req.body);
        if(!result.success){
            return res.status(404).json({error: JSON.parse(result.error.message)})
        }

        const { id } = req.params;

        const changeProduct = await ProductsModel.updateProduct({id, input:result.data});
        if(changeProduct === false){
            return res.status(404).json({message: "Product not found"});
        }else return res.status(400).json(changeProduct);
    }

    static async deleteProduct(req, res){
        const {id } = req.params;
        const deleteProduct = await ProductsModel.deleteProduct({id});
        if(deleteProduct===false){
            return res.status(404).json({message: "Product not found"});
        }else{
            return res.status(400).json({message:"Product deleted"});
        }
    }

}
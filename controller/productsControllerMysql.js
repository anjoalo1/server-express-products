import { ModelMysql } from "../models/productsModelMysql.js";


export class ControllerMysql{

    static async getAll(req, res) {

        const { genre } =req.query;

        
        const getAllProducts = await ModelMysql.getAllProducts({genre});
        if(getAllProducts)return res.status(400).json(getAllProducts);
            else return res.status(404).json({message:"Products not found"});
        
    }
}
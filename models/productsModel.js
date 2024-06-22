import { productsBD } from '../products.js';
import {randomUUID} from 'node:crypto'
import { productEschema, validateProduct, validatePartialProduct } from '../scheemes/productScheme.js';

export class ProductsModel{


    //show all products
    static async getAll(){
        return productsBD;
    }

    static async getProductById({id}){
        const buscarId =  productsBD.find(pro=>pro.id===id);
        if(buscarId)return buscarId;
        return false;
    }

    static async createProduct(result){
        const newProduct = {
            id:randomUUID(),
            ...result
        }
        productsBD.push(newProduct);
        return newProduct;
    }

    static async updateProduct({id, input}){
        const movieIndex = await productsBD.findIndex(x => x.id ===id);
        if(movieIndex===-1){
            return false
        }else{
            const updateProduct = {
                ...productsBD[movieIndex],
                ...input
            }

            productsBD[movieIndex] = updateProduct;
            return updateProduct;
        }
    }

    static async deleteProduct ({id}){
        const movieIndex =  productsBD.findIndex(x => x.id ===id);
        if(movieIndex===-1){
            return false;
        }else{
            productsBD.splice(movieIndex, 1)
        }
    }
}
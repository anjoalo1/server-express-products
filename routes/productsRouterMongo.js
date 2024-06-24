import {Router} from 'express';
import { productsControllerMongo } from '../controller/productsControllerMongo.js';
export const productsRouter = Router();

productsRouter.get('/', productsControllerMongo.getAll);;

 productsRouter.get('/:id', productsControllerMongo.getProductById);

 productsRouter.post('/', productsControllerMongo.createProduct)
 
 /*
productsRouter.patch('/:id', ProductsController.updateProduct)

*/
productsRouter.delete('/:id',productsControllerMongo.deleteProductById)
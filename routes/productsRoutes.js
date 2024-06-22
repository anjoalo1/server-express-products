import { ProductsController } from '../controller/productsController.js'
import {Router} from 'express'
export const moviesRouter = Router()

moviesRouter.get('/', ProductsController.getAll);

moviesRouter.get('/:id', ProductsController.getProductById)

moviesRouter.post('/', ProductsController.createProduct)

moviesRouter.patch('/:id', ProductsController.updateProduct)

moviesRouter.delete('/:id', ProductsController.deleteProduct)
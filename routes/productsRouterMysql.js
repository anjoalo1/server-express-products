
import {Router} from 'express'

import { ControllerMysql } from '../controller/productsControllerMysql.js';
export const productsRouterMysql = Router()

productsRouterMysql.get('/', ControllerMysql.getAll);
/* 

productsRouterMysql.get('/:id', ProductsController.getProductById)

productsRouterMysql.post('/', ProductsController.createProduct)

productsRouterMysql.patch('/:id', ProductsController.updateProduct)

productsRouterMysql.delete('/:id', ProductsController.deleteProduct) */
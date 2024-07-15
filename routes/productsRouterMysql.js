
import {Router} from 'express'

import { ControllerMysql } from '../controller/productsControllerMysql.js';
export const productsRouterMysql = Router()

productsRouterMysql.get('/', ControllerMysql.getAll);

productsRouterMysql.get('/:id', ControllerMysql.getProductById)

productsRouterMysql.patch('/:id', ControllerMysql.updateProduct)
/* 
productsRouterMysql.post('/', ProductsController.createProduct)


productsRouterMysql.delete('/:id', ProductsController.deleteProduct) */
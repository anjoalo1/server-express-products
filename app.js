import express from 'express'
import { consultarDocumentos } from './coenections/mongoConection.js';
import { moviesRouter } from './routes/productsRoutes.js'
import { productsRouter } from './routes/productsRouterMongo.js';
import { productsRouterMysql } from './routes/productsRouterMysql.js';

import { consultarProductos } from './conectionDb/productsModelMongo.js';
const app = express()
const port = process.env.PORT ?? 3000;

import cors from 'cors';
// Configurar CORS con opciones específicas
app.use(cors());

app.use(express.json())

//router de productos en un array local
app.use('/products', moviesRouter)


//router de productos en base de datos mongo
app.use('/productsmongo', productsRouter)

app.use('/productsmysql', productsRouterMysql)

app.get('/',(req, res)=>{
    res.status(400).json({message:"Conection ok"})
})

app.get('/mongo', async (req, res)=>{
    const resultado = await consultarDocumentos();
    /* console.log("resultado desde controlador principal", resultado) */
    res.status(400).json(resultado);
})
app.get('/mongo2', async (req, res)=>{
    const resultado = await consultarProductos();
    /* console.log("resultado desde controlador principal", resultado) */

    console.log(resultado.find(s=>s._id=="667727f583c2e127893bab3c"))
    res.status(400).json(resultado);
})

app.listen(port, ()=>{
    console.log(`Server listenin http://localhost:${port}`)
})
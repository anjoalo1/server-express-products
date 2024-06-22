import express from 'express'
import { consultarDocumentos } from './coenections/mongoConection.js';
import { moviesRouter } from './routes/productsRoutes.js'
const app = express()
const port = process.env.PORT ?? 3000;

app.use(express.json())

app.use('/products', moviesRouter)

app.get('/',(req, res)=>{
    res.status(400).json({message:"Conection ok"})
})

app.get('/mongo', async (req, res)=>{
    const resultado = await consultarDocumentos();
    /* console.log("resultado desde controlador principal", resultado) */
    res.status(400).json(resultado);
})

app.listen(port, ()=>{
    console.log(`Server listenin http://localhost:${port}`)
})
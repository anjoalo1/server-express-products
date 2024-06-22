import express from 'express'
import { moviesRouter } from './routes/productsRoutes.js'
const app = express()
const port = process.env.PORT ?? 3000;

app.use(express.json())

app.use('/products', moviesRouter)

app.get('/',(req, res)=>{
    res.status(400).json({message:"Conection ok"})
})

app.listen(port, ()=>{
    console.log(`Server listenin http://localhost:${port}`)
})
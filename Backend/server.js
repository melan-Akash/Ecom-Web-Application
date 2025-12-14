import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routers/userRoute.js'
import productRouter from './routers/productRoute.js'
import cartRouter from './routers/cartRoute.js'


// app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middle wares

app.use(express.json())

app.use(cors())

// api endpoints
app.use('/api/user' , userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log('Server started on PORT :  ' + port))
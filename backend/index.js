

import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './db/database.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import bookinRouter from './routes/booking.route.js'
import userRouter from './routes/user.route.js'
import cors from 'cors'
dotenv.config()

const PORT=process.env.PORT || 3000
const app=express()


// middleware--
app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))


// load routes
app.use('/api/auth',authRouter)
app.use('/api/listing',listingRouter)
app.use('/api/booking',bookinRouter)
app.use('/api/user',userRouter)


app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
    dbConnection(process.env.DATABASE_URL)
})




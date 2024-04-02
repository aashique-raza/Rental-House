

import mongoose from "mongoose";


async function dbConnection(url){
    try {
        const con=await mongoose.connect(url)
        console.log(`database connected`)
        
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnection
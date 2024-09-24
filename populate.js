const { json } = require('express');
const connectdb = require('./db/connect');

require('dotenv').config();

const connectDB = require('./db/connect');

const product = require('./models/product');

const jsonproducts = require('./products.json');

const start = async()=>{
    try{
        await connectDB(process.env.mongo_url);
        await product.deleteMany();
        await product.create(jsonproducts);

        console.log(" Connection is successful");
        process.exit(0);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

start();

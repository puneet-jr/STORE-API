require('dotenv').config();

const express= require('express');
const productroute= require("./routes/product");

require("express-async-errors");

const app = express();

const connectdb = require('./db/connect');



//middlewares


const notfoundmiddlweware = require('./middlewares/notfound');
const errorMiddleware = require('./middlewares/error');

app.use(express.json());

//routes

app.get('/',(req,res)=>{
        res.send(" The store API is working");

});




//products route



app.use('/api/v1/products',productroute);

//port


const port=5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

app.use(notfoundmiddlweware);
app.use(errorMiddleware);

//connect to database
const start= async()=>{try{
    await connectdb(process.env.mongo_url);
  
  }
  catch(error){
      console.log.error;
  }
  }
  start();




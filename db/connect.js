const  mongoose= require("mongoose");

const connectdb= async()=>{

    return mongoose.connect(process.env.mongo_url);

};

module.exports= connectdb;
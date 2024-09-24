const mongoose= require("mongoose");


const product = new mongoose.Schema({
    name: {
        type:String ,
        required:[true,"product name is required"],
        
    },
    price:{
        type: Number,
        required:[true,"product price is required"],
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type: Number,
        default:4.0,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },

    company:{
        type: String,
        enum:{
            values:['ikea','liddy','caressa','marcos','microsoft','google'],
            message:"{VALUE} is not supported",
    },
},
});

module.exports= mongoose.model("product",product);



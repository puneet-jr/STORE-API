const express = require('express');
const product = require('../models/product'); // Ensure the correct path to the product model

const getallproductsstatic = async (req, res) => {
    try {
        // const search="d";
        // const products = await product.find({
        // //  name:"donut",
        
        // name :{$regex: search, $options: 'i'},
         
        // });

        const products = await product.find({}).sort('-name price');
        
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getallproducts = async (req, res) => {

    const {featured,company,name,sort}=req.query;

    const queryObject={};
    if(featured)
    {
        queryObject.featured=featured;
    }
    else{ 
        
        queryObject.featured=false;
    }
    if(company)
    {
        queryObject.company=company;
    }
    else{
        return res.status(500).json({message: 'THERE IS NO SUCH COMPANY'});
    }
    if(name)
    {
        queryObject.name={$regex: name,$options:"i"} //name;
    }

   // console.log(queryObject);
   // In the below one for sorting const is not useful so let is used.
  //const products= await product.find(queryObject);
  let result = await product.find(queryObject);
  if(sort)
  {
   console.log(sort);
  }
  const products= await result;

    res.status(200).json({ products, nBHits: products.length });
};

module.exports = { getallproductsstatic, getallproducts };

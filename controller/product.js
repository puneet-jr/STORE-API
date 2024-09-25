const express = require('express');
const product = require('../models/product'); // Ensure the correct path to the product model

const getallproductsstatic = async (req, res) => {
    try {
        // const search="d";
        // const products = await product.find({
        // //  name:"donut",
        
        // name :{$regex: search, $options: 'i'},
         
        // });

       // const products = await product.find({}).sort('-name price').;  // this only sorts the data based on name and price.
       // const products = await product.find({}).select('name price');//  this only selects and gives the name ans price of the product.
        
       // Using the limit to limit the number of products to be shown.
    //   const products= await product.find({}).sort('name').select('name price').limit(3);

// the below one is used to skip and not showcase the numbe of products skipped.

   //  const products= await product.find({}).sort('name').select('name price'); // this or the below one can be used.
   const products= await product.find({}).sort('price').select('name price');
       // We can also use the skip to skip the number of products.
         //const products= await product.find({}).sort('name').select('name price').limit(3).skip(1);  // this skips 1 sinceskips(1). Like this this works.

       
       res.status(200).json({ products }); 
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getallproducts = async (req, res) => {

    const {featured,company,name,sort,numericFilters}=req.query;

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

        queryObject.name={$regex: name,$options:"i"} //name // this is used to search the name of the product.;
    }

    // still need to understand how to use the numeric filters. and also how each line works from 61 to 80.
    if(numericFilters){

      const operatorMap={
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };

      const regEx=/\b(<|>|>=|<=|=)\b/g;
    
      let filters= numeric.Filters.replace(regEx,(match)=>`-${operatorMap[match]}-`);// this is used to replace the operator with the operatorMap .
      
      const options = ['price','rating'];
     
      filters = filters.split(',').forEach(item => {
        const [feild,operator,value] = item.split('-');
        if(options.includes(feild)){
         // queryObject[feild]={...queryObject[feild],[operator]:Number(value)};
          queryObject[feild]={[operator]:Number(value)};
        } 
        // You can now use key and value as needed
    });
    
    }

   // console.log(queryObject);
   // In the below one for sorting const is not useful so let is used.
  //const products= await product.find(queryObject);
  let result = await product.find(queryObject);
  if(sort)
  {
    const sortlist = sort.split(',').json(' ');
    result= result.sort(sortlist);

  // console.log(sort);

  }
  else{
    result=result.sort('createdAt');// In this any of the model value can be given like name , rating price etc.
  }

  if(feilds)
  {
    const feildslist= feilds.split(',').join(' ');
    result=result.select(feildslist);  // this give you an output of the feilds you have given. remaining will not be shown in the output.
  }
  const page= Number(req.query.page)||1;// this is used to get the page number.
  const limit= Number(req.query.limit)||10;// this is used to get the limit of the products to be shown.
    const skip=(page-1)*limit;  // this is used to skip the number of products.
    result=result.skip(skip).limit(limit); // this is used to limit the number of products to be shown. 
    // if we do not want to write the above page and limit we can directly write this line result = result.skip(skip).limit(Number(limit));.
// We also have a word called limit which is used to limit the number of products to be shown.
  const products= await result;


    res.status(200).json({ products, nBHits: products.length });
};

module.exports = { getallproductsstatic, getallproducts };

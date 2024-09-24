const express= require("express");

const router= express.Router();

const {getallproductsstatic,getallproducts}= require('../controller/product');

router.route('/static').get(getallproductsstatic);
router.route('/allproducts').get(getallproducts);

module.exports= router;

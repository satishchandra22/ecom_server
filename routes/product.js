const { verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');
const Product = require('../models/Product');

const router = require('express').Router();


router.post("/",verifyTokenAdmin, async (req,res)=>{
   const newProduct = new Product(req.body);

   try{
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
   }catch(err){
    res.status(500).json(err);
   }
})

router.put("/:id",verifyTokenAdmin,async (req,res)=>{
    

    try{
        const upadatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(upadatedProduct);
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyTokenAdmin,async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product has been removed sucessfully")
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/find/:id",async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/",async (req,res)=>{
    try{
        const product = await Product.find();
        res.status(200).json(product)
    } catch(err){
        res.status(500).json(err)
    }
} )
module.exports = router;
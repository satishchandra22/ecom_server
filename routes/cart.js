const { verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');
const Cart = require('../models/Cart');

const router = require('express').Router();


router.post("/", async (req,res)=>{
   const newCart = new Cart(req.body);

   try{
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
   }catch(err){
    res.status(500).json(err);
   }
})

router.put("/:id",verifyTokenAuth,async (req,res)=>{
    
   
    try{
        const upadatedCart = await Cart.updateOne({userId:req.params.id},{
            $push:req.body
        },{new:true});
        res.status(200).json(upadatedCart);
        console.log('tryblock')
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

router.delete("/:id",verifyTokenAuth,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("product in cart has been removed sucessfully")
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/find/:id", verifyTokenAuth,async (req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.id});
        res.status(200).json(cart)
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/",verifyTokenAdmin,async (req,res)=>{
    try{
        const cart = await Cart.find();
        res.status(200).json(cart)
    } catch(err){
        res.status(500).json(err)
    }
} )
module.exports = router;
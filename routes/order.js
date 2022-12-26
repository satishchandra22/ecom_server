const { verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');
const Order = require('../models/Order');

const router = require('express').Router();


router.post("/",verifyTokenAuth, async (req,res)=>{
   const newOrder = new Order(req.body);

   try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
   }catch(err){
    res.status(500).json(err);
   }
})

router.put("/:id",verifyTokenAdmin,async (req,res)=>{
    

    try{
        const upadatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(upadatedOrder);
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyTokenAdmin,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order in cart has been removed sucessfully")
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/find/:id", verifyTokenAuth,async (req,res)=>{
    try{
        const order = await Order.find({userId:req.params.id});
        res.status(200).json(order)
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/",verifyTokenAdmin,async (req,res)=>{
    try{
        const order = await Order.find();
        res.status(200).json(order)
    } catch(err){
        res.status(500).json(err)
    }
} )
module.exports = router;
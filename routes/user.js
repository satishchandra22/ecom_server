const { verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');
const bcrypt = require("bcrypt");
const User = require('../models/User');

const router = require('express').Router();

router.put("/:id",verifyTokenAuth,async (req,res)=>{
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password,salt);
        req.body.password = hash
    }

    try{
        const upadatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(upadatedUser);
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyTokenAuth,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been removed sucessfully")
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/find/:id",verifyTokenAdmin,async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others)
    } catch(err){
        res.status(500).json(err)
    }
} )

router.get("/",verifyTokenAdmin,async (req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
} )
module.exports = router;
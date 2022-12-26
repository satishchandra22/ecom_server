const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title : { type: String , required:true , unique:true},
    img: { type: String, required: true},
    cost: { type: Number, required: true},
    dcost: { type: Number, required: true},
    rating: { type: Number, required: true},

},{timestamps:true});

module.exports = mongoose.model('Product', ProductSchema);
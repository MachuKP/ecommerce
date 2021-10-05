const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
    {
        title: {required:true, type: String, unique: true},
        desc: {required:true, type: String},
        image: {required:true, type: String},
        categories: {type: Array},
        color: {type: String},
        size: {type: String},
        price: {required:true, type: Number},
    },
    {timestamps: true}
);

module.exports = model("Product", ProductSchema);
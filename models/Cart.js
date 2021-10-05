const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
    {
        userId:{required:true, type:Number},
        products:[
            {
                productId:{required:true, type:Number},
                quantity:{type:Number, default: 1}
            }
        ],
        amount:{required:true, type:String},
        address:{required: true, type:String},
        status:{type:String, default:"pending"}
    },
    {timestamps: true}
);

module.exports = model("Cart", CartSchema);
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {required:true, type: String},
        email: {required:true, type: String},
        password: {required:true, type: String},
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

module.exports = model("User", UserSchema);
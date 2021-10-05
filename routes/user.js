const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

//put METHOD

// app.put(path, callback [, callback ...])
// Routes HTTP PUT requests to the specified path with the specified callback functions

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECERT).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});
        res.status(200).json(updateUser);
    } catch(err) {
        res.status(400).json(err);
    }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id),
        res.status(200).json("user has been deleted");
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET USER

router.get("/find/:id", verifyTokenAndAdmin, async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        //seperate password for user date to prevent admin see it
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req,res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {
                month: {$month: "$createdAt"}
            },},
            {$group: {
                _id: "$month",
                total: {$sum: 1}
            },},
        ]);
        res.status(200).json(data);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
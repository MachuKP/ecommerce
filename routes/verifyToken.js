const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authToken = req.headers.token;
    if (authToken) {
        const token = authToken.split(" ")[1];
        jwt.verify(token, process.env.JWT_SIGN, (err, user) => {
            if (err) res.status(403).json("verify is invalid");
                req.user = user;
                next();
            });
    } else {
        res.status(401).json("you're not authendication");
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.user.id)
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(401).json("You are not alowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(401).json("You are not alowed to do that!");
        }
    });
};

module.exports = {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken};
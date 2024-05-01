const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");
function authMiddleware(req,res,next){
    const header = req.headers.authorization;
    if(!header){
        return res.status(403).json({
            message: "Token not found"
        })
    }
    if(!(header.split(" ")[0]=='Bearer')){
        return res.status(403).json({
            message: "Incorrect Token"
        })
    }
    const token = header.split(" ")[1]
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId;
        next()
    }catch(err){
        return res.status(403).json({
            message: "Incorrect Token please login again!!"
        })
    }
}
module.exports={
    authMiddleware
}
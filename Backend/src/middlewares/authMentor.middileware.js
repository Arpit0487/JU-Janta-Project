const jwt = require("jsonwebtoken");

async function authMentor(req,res,next) {
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if(decoded.role !== "mentor"){
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    
    req.user = decoded;
    next();
  }

  catch(error){
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }

}

module.exports = {authMentor};
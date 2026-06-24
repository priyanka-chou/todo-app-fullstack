const jwt = require("jsonwebtoken");


const JWT_SECRET = process.env.JWT_SECRET;



const auth =(req,res,next)=>{

    const token =req.headers.authorization;

    if (!token) {
    return res.status(401).json({
      message: "No Token"
    });
  }

  try{
     const decoded = jwt.verify(
        token,
        JWT_SECRET
     );
     

        console.log("DECODED:", decoded);
     req.user =decoded;

     next();
  }
  catch(error){
    console.log("JWT ERROR:", error.message);
    res.status(401).json({
        message : "Invalid Token"
    });
  }
};

module.exports =auth;
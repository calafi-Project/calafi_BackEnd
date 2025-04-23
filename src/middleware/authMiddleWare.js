const jwt= require('jsonwebtoken');

//Access Token 검증

const authMiddleWare= (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[0];
    if(!token) return res.status(401).json({meesage:"인증 실패 토큰 없음"});

    try{
        const decoded = jwt.verify(token,process.env.SECRETKEY);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(403).json({message:"토큰이 만료되었거나 일치 하지 않습니다."});
    }
};

module.exports = authMiddleWare;
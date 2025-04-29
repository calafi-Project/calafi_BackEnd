const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('./repository');

exports.login= async (req,res)=>{
    try{
        const {email, password} = req.body;

        //유저 조회
        const [user] = await repository.searchEmail(email);
        // users를 []로 감싸는 이유는 배열인 값이 올 때 첫번째 값을 users에 할당 하기 위해서 [] 감싼다
        if(user.length===0){
            return res.status(400).json({message:"아이디가 존재하지 않습니다."});
        }

        //비밀번호 검증
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"비밀번호가 일치 하지 않습니다."});

        //JWT 발급
        const accessToken = jwt.sign({id:user.id,email:user.email,password:password},process.env.SECRETKEY,{expiresIn:'1000y'});
        const refreshToken = jwt.sign({id:user.id,email:user.email},process.env.SECRETKEY,{expiresIn:'1000y'});

        // Refresh Token을 쿠키에 저장
        res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:false});
        res.json(accessToken);
    }catch(err){
        res.status(500).json({message:"서버 오류"});
    }
}

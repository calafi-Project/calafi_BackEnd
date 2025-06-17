const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const repository = require('./repository');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 유저 조회
        const [rows] = await repository.searchEmail(email);
        const user = rows[0];
        if (!user) {
            return res.status(400).json({ message: "아이디가 존재하지 않습니다." });
        }

        // 비밀번호 검증
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
        }

        // JWT 발급
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRETKEY,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRETKEY,
            { expiresIn: '7d' }
        );

        // Refresh Token을 쿠키에 저장
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });

        // 액세스 토큰 응답
        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err.message });
    }
};

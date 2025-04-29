const repository = require('./repository');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    try {
        const { email, name, age, height, weight, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
 
        await repository.signUp(email, name, age, height, weight, hashPassword);

        const user_id = await repository.getId(email);

        await repository.signAct(user_id);

        res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "서버 오류" });
    }
};

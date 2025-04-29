const { pool } = require('../../database');

// 유저 생성 함수
exports.signUp = async (email, name, age, height, weight, password) => {
    const query = `INSERT INTO users (email, name, age, height, weight, password) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await pool.query(query, [email, name, age, height, weight, password]);
    return result;
};

exports.getId = async (email) => {
    const query = `SELECT id FROM users WHERE email = ?`;
    const result = await pool.query(query, [email]);
    return result[0]?.id;
};

exports.signAct = async (user_id) => {
    const query = `INSERT INTO userAct (user_id) VALUES (?)`;
    await pool.query(query, [user_id]);
};

const { pool } = require('../../database');

exports.getUser= async(id)=>{
    const query=`select * from users where id = ?`;
    return await pool.query(query,[id]);
}

exports.getUserAct= async(id)=>{
    const query=`select * from useract where user_id = ?`;
    return await pool.query(query,[id]);
}

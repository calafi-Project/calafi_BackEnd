const { pool } = require('../../database');

exports.searchEmail= async(email)=>{
    const query=`select * from users where email = ?`;
    return await pool.query(query,[email]);
}
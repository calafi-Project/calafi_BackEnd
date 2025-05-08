const { pool } = require('../../database');

exports.getUser= async(id)=>{
    const query=`select * from users where id = ?`;
    return await pool.query(query,[id]);
}

exports.getUserAct= async(id)=>{
    const query=`select * from useract where user_id = ?`;
    return await pool.query(query,[id]);
}

exports.updatePhysical = async (userId, height, weight) => {
    const query = `
      UPDATE users
      SET height = ?, weight = ?
      WHERE id = ?
    `;
    return await pool.query(query, [height, weight, userId]);
  };

  exports.getUserPassword = async (userId) => {
    const query = `SELECT password FROM users WHERE id = ?`;
    return await pool.query(query, [userId]);
  };
  
  exports.updatePassword = async (userId, hashedPassword) => {
    const query = `UPDATE users SET password = ? WHERE id = ?`;
    return await pool.query(query, [hashedPassword, userId]);
  };

  

  
  exports.getRoutineFlag = async (userId) => {
    return await pool.query(`SELECT isroutine FROM userAct WHERE user_id = ?`, [userId]);
  };
  
  exports.updateRoutineFlag = async (userId, value) => {
    const result = await pool.query(`UPDATE userAct SET isroutine = ? WHERE user_id = ?`, [value, userId]);
    console.log(result); // 쿼리 실행 결과 확인
    return result;
  };
  
  exports.getWorkoutFlag = async (userId) => {
    return await pool.query(`SELECT isworkout FROM userAct WHERE user_id = ?`, [userId]);
  };
  
  exports.updateWorkoutFlag = async (userId, value) => {
    const result = await pool.query(`UPDATE userAct SET isworkout = ? WHERE user_id = ?`, [value, userId]);
    console.log(result); // 쿼리 실행 결과 확인
    return result;
  };
  
  exports.getVisibilityFlags = async (userId) => {
    return await pool.query(`SELECT isroutine, isworkout FROM userAct WHERE user_id = ?`, [userId]);
  };
  
const { pool } = require('../../database');

exports.updateCalori = async(calori,userId)=>{
    const query = `
      UPDATE userAct
      SET calori_burned = calori_burned + ?
      WHERE user_id = ?
    `;
  return await pool.query(query, [calori, userId]);
}

exports.updateWork = async(worktime,userId)=>{
    const query = `
    UPDATE userAct
    SET work_time = work_time + ?
    WHERE user_id = ?
    `;
  return await pool.query(query, [worktime, userId]);
}

exports.updateRoutine = async(routine,userId)=>{
    const query = `
      UPDATE userAct
      SET complete_routine = complete_routine + ?
      WHERE user_id = ?
    `;
  return await pool.query(query, [routine, userId]);
}
const { pool } = require('../../database');

exports.searchExsercise = async(searchTerm)=>{
  const query = `SELECT * FROM exercise_types WHERE name REGEXP ? LIMIT 2`;
  return await pool.query(query,[searchTerm]);
}
exports.searchRutine = async(searchTerm)=>{
  const query =`SELECT * FROM routines WHERE name REGEXP ? LIMIT 2`;
  return await pool.query(query,[searchTerm]);
}

exports.searchMember = async(searchTerm)=>{
  const query = `SELECT id, name, profile_image FROM users WHERE name REGEXP ? LIMIT 2`;
  return await pool.query(query,[searchTerm]);
}

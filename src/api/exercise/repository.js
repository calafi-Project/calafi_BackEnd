const { pool } = require('../../database');

exports.getExercise= async()=>{
    const query=`select * from exercise_types`;
    return await pool.query(query);
}

exports.searchExercise = async(searchTerm)=>{
    const query = `
    SELECT * FROM exercise_types 
    WHERE name REGEXP ?
  `;
  return await pool.query(query,[searchTerm]);
}

exports.commentExercise = async(exercise_id,user_id,content)=>{
    const query = `
    INSERT INTO Exercise_comments (exercise_id, user_id, content)
    VALUES (?, ?, ?)
  `;
  return await pool.query(query,[exercise_id,user_id,content]);
}

exports.getCommentExercise = async(exercise_id)=>{
    const query = `
    SELECT c.id, c.content, c.created_at, u.name AS user_name 
    FROM Exercise_comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.exercise_id = ?
    ORDER BY c.created_at asc
  `;
  return await pool.query(query,[exercise_id]);
}
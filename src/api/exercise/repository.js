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

exports.addExerciseSchedule = async (userId, videoId) => {
  const query = `
    INSERT IGNORE INTO user_exercise_schedule (user_id, video_id)
    VALUES (?, ?)
  `;
  return await pool.query(query, [userId, videoId]);
};

exports.removeExerciseSchedule = async (userId, videoId) => {
  const query = `
    DELETE FROM user_exercise_schedule
    WHERE user_id = ? AND video_id = ?
  `;
  return await pool.query(query, [userId, videoId]);
};

exports.getMyExerciseSchedule = async (userId) => {
  const query = `
    SELECT ev.*
    FROM user_exercise_schedule ues
    JOIN exercise_videos ev ON ues.video_id = ev.id
    WHERE ues.user_id = ?
  `;
  return await pool.query(query, [userId]);
};

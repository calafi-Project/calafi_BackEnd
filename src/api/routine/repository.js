const { pool } = require('../../database');

exports.getRoutines = async (ids) => {
  // ids 배열을 동적으로 처리하기 위해 '?' placeholder를 만들어주고
  const placeholders = ids.map(() => '?').join(',');  // 동적으로 ?를 만듦
  const query = `
    SELECT 
      r.id AS routine_id,
      r.name AS routine_name,
      r.description,
      r.tags,
      r.likes,
      r.created_at,
      u.name AS author_name,
      u.profile_image,
      u.grade
    FROM routines r
    JOIN users u ON r.user_id = u.id
    WHERE r.id IN (${placeholders})
  `;

  const rows = await pool.query(query, ids);  // ids 배열을 쿼리 파라미터로 전달
  console.log(rows);  // 결과를 확인
  return rows;
};

exports.searchRoutine = async(searchTerm)=>{
  const query = `
  SELECT * FROM routines  
  WHERE name REGEXP ?
`;
return await pool.query(query,[searchTerm]);
}

exports.routineDetail = async(routineId)=>{
  const query = `
    SELECT 
        r.id AS routine_id,
        r.name AS routine_name,
        r.description AS routine_description,
        r.tags AS routine_tags,
        u.name AS author_name,
        u.profile_image AS author_profile_image,
        u.grade AS author_grade,
        ev.id AS video_id,
        ev.title AS video_title,
        ev.video_url AS video_url
    FROM routines r
    JOIN users u ON r.user_id = u.id
    LEFT JOIN routine_details rd ON r.id = rd.routine_id
    LEFT JOIN exercise_videos ev ON rd.video_id = ev.id
    WHERE r.id = ?;
  `;

  return await pool.query(query,[routineId]);
}

exports.commentRoutine = async (routine_id, user_id, content) => {
  const query = `
      INSERT INTO routine_comments (routine_id, user_id, content)
      VALUES (?, ?, ?)
  `;
  return await pool.query(query, [routine_id, user_id, content]);
};

exports.getCommentRoutine = async (routine_id) => {
  const query = `
      SELECT c.id, c.content, c.created_at, u.name AS user_name 
      FROM routine_comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.routine_id = ?
      ORDER BY c.created_at ASC
  `;
  return await pool.query(query, [routine_id]);
};

exports.likeRoutine = async (userId,routineId)=>{
  const query = `
  INSERT IGNORE INTO routine_likes (user_id, routine_id) VALUES (?, ?)
  `;
  return await pool.query(query, [userId,routineId]);
}

exports.updateHeart = async (routineId)=>{
  console.log(routineId);
  const query = `
  UPDATE routines SET likes = likes + 1 WHERE id = ?
  `;
  return await pool.query(query, [routineId]);
}

exports.deleteHeart = async (userId, routineId)=>{
  const query = `
  DELETE FROM routine_likes WHERE user_id = ? AND routine_id = ?
  `;
  return await pool.query(query, [userId,routineId]);
}

exports.deletelike = async (routineId)=>{
  const query = `
  UPDATE routines SET likes = likes - 1 WHERE id = ? AND likes > 0
  `;
  return await pool.query(query, [routineId]);
}

exports.joinLike = async (userId)=>{
  const query = `
  SELECT id, name, description, tags, likes, created_at FROM routines WHERE user_id = ?
  `;
  return await pool.query(query, [userId]);
}

exports.joinlikeRoutine = async (userId)=>{
  const query = `
  SELECT r.id, r.name, r.description, r.tags, r.likes, r.created_at
     FROM routine_likes rl
     JOIN routines r ON rl.routine_id = r.id
     WHERE rl.user_id = ?
  `;
  return await pool.query(query, [userId]);
}
exports.addSchedule = async (userId, routineId, weekday) => {
  const query = `
    INSERT INTO weekly_routines (user_id, routine_id, weekday)
    VALUES (?, ?, ?)
  `;
  return await pool.query(query, [userId, routineId, weekday]);
};
exports.removeSchedule = async (userId, routineId, weekday) => {
  const query = `
    DELETE FROM weekly_routines
    WHERE user_id = ? AND routine_id = ? AND weekday = ?
  `;
  return await pool.query(query, [userId, routineId, weekday]);
};
exports.getRoutinesByWeekday = async (userId, weekday) => {
  const query = `
    SELECT r.*
    FROM weekly_routines wr
    JOIN routines r ON wr.routine_id = r.id
    WHERE wr.user_id = ? AND wr.weekday = ?
  `;
  return await pool.query(query, [userId, weekday]);
};

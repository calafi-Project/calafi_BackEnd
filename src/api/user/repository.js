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

  
// userAct에서 isroutine 조회
exports.getRoutineFlag = async (userId) => {
  const [rows] = await pool.query(`SELECT isroutine FROM userAct WHERE user_id = ?`, [userId]);
  return rows[0]; // 단일 행 반환
};

// userAct에서 isworkout 조회
exports.getWorkoutFlag = async (userId) => {
  const [rows] = await pool.query(`SELECT isworkout FROM userAct WHERE user_id = ?`, [userId]);
  return rows[0]; // 단일 행 반환
};

  exports.updateRoutineFlag = async (userId, value) => {
    const result = await pool.query(`UPDATE userAct SET isroutine = ? WHERE user_id = ?`, [value, userId]);
    console.log(result); // 쿼리 실행 결과 확인
    return result;
  };
  
  
  exports.updateWorkoutFlag = async (userId, value) => {
    const result = await pool.query(`UPDATE userAct SET isworkout = ? WHERE user_id = ?`, [value, userId]);
    console.log(result); // 쿼리 실행 결과 확인
    return result;
  };
  
  exports.getVisibilityFlags = async (userId) => {
    return await pool.query(`SELECT isroutine, isworkout FROM userAct WHERE user_id = ?`, [userId]);
  };
  
  exports.getUserOverview = async (userId, viewerId) => {
    const userInfoQuery = `
      SELECT u.name, u.profile_image, u.grade,
             ua.work_time, ua.complete_routine, ua.calori_burned
      FROM users u
      LEFT JOIN userAct ua ON u.id = ua.user_id
      WHERE u.id = ?
    `;
  
    const userVideosQuery = `
      SELECT id, title, video_url, created_at
      FROM exercise_videos
      WHERE created_by = ?
    `;
  
    const userRoutinesQuery = `
      SELECT r.id, r.name, r.description, r.tags, r.likes, r.created_at,
        EXISTS (
          SELECT 1 FROM routine_likes rl 
          WHERE rl.routine_id = r.id AND rl.user_id = ?
        ) AS is_liked
      FROM routines r
      WHERE r.user_id = ?
    `;
  
    const [userInfo] = await pool.query(userInfoQuery, [userId]);
    const [videos] = await pool.query(userVideosQuery, [userId]);
    const [routines] = await pool.query(userRoutinesQuery, [viewerId, userId]);
  
    return {
      user_info: userInfo[0],
      videos,
      routines,
    };
  };
  
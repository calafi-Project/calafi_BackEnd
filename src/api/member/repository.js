const { pool } = require('../../database');

exports.userRows = async (memberId)=>{
    const query = `
        SELECT u.id, u.name, u.grade, u.profile_image,
        (SELECT COUNT(*) FROM follows WHERE following_id = u.id) AS followers_count,
        (SELECT COUNT(*) FROM follows WHERE follower_id = u.id) AS following_count
        FROM users u WHERE u.id = ?
    `;
    return await pool.query(query,[memberId]);
}

exports.followRows = async (myId,memberId)=>{
    const query = `
        SELECT COUNT(*) AS is_following
        FROM follows
        WHERE follower_id = ? AND following_id = ?
    `;
    return await pool.query(query,[myId, memberId]);
}

exports.activityRows = async (memberId)=>{
    const query = `
    SELECT work_time, complete_routine, calori_burned
    FROM userAct WHERE user_id = ?
    `;
    return await pool.query(query,[memberId]);
}

exports.routineRows = async (memberId)=>{
    const query = `
    SELECT r.id, r.name, r.description
    FROM routines r
    JOIN user_visible_contents uvc ON uvc.routine_id = r.id
    WHERE uvc.user_id = ? AND uvc.type = 'routine' AND uvc.is_visible = true
    `;
    return await pool.query(query,[memberId]);
}

exports.videoRows = async (memberId)=>{
    const query = `
    SELECT ev.id, ev.title, ev.video_url
    FROM exercise_videos ev
    JOIN user_visible_contents uvc ON uvc.video_id = ev.id
    WHERE uvc.user_id = ? AND uvc.type = 'workout' AND uvc.is_visible = true
    `;
    return await pool.query(query,[memberId]);
}
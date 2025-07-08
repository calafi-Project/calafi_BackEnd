const { pool } = require('../../database');

exports.searchExercise = async (searchTerm, currentUserId) => {
  const query = `
    SELECT e.*, 
           EXISTS(SELECT 1 FROM exercise_likes el WHERE el.exercise_id = e.id AND el.user_id = ?) AS isHeart
    FROM exercise_types e
    WHERE e.name REGEXP ?;
  `;
  return pool.query(query, [currentUserId, searchTerm]);
};

exports.searchRoutine = async (searchTerm, currentUserId) => {
  const query = `
    SELECT r.*,
           u.name AS author_name,
           u.profile_image AS author_profile,
           EXISTS(SELECT 1 FROM routine_likes rl WHERE rl.routine_id = r.id AND rl.user_id = ?) AS isHeart,
           EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.following_id = u.id) AS isFollow
    FROM routines r
    JOIN users u ON u.id = r.user_id
    WHERE r.name REGEXP ?;
  `;
  return pool.query(query, [currentUserId, currentUserId, searchTerm]);
};

exports.searchMember = async (searchTerm, currentUserId) => {
  const query = `
    SELECT u.id, u.name, u.profile_image, u.grade,
           EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.following_id = u.id) AS isFollow
    FROM users u
    WHERE u.name REGEXP ? AND u.id != ?;
  `;
  return pool.query(query, [currentUserId, searchTerm, currentUserId]);
};

exports.searchVideo = async (searchTerm, currentUserId) => {
  const query = `
    SELECT ev.*, 
           EXISTS(
             SELECT 1 FROM exercise_likes el 
             WHERE el.exercise_id = ev.id AND el.user_id = ?
           ) AS isHeart
    FROM exercise_videos ev
    WHERE ev.title REGEXP ?;
  `;
  return pool.query(query, [currentUserId, searchTerm]);
};

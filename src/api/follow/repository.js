const { pool } = require('../../database');

exports.follow = async (followerId,follwingId)=>{
    return await pool.query(`INSERT INTO follows (follower_id, following_id) VALUES (?, ?)`, [followerId,follwingId]);
}

exports.unfollow = async (followerId,followingId)=>{
    return await pool.query(`DELETE FROM follows WHERE follower_id = ? AND following_id = ?`,[followerId,followingId])
}

exports.getfollowing =async(myId)=>{
    return await pool.query(`SELECT users.* FROM follows JOIN users ON follows.following_id = users.id WHERE follows.follower_id = ?`,[myId])
}

exports.getfollow =async(myId)=>{
    return await pool.query(`SELECT users.* FROM follows JOIN users ON follows.follower_id = users.id WHERE follows.following_id = ?`,[myId])
}

exports.isFollowing =async(myId,targetId)=>{
    return await pool.query(`SELECT * FROM follows WHERE follower_id = ? AND following_id = ?`,[myId,targetId]);
}
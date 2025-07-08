const repository = require('./repository');

exports.follow = async (req,res)=>{
    const followerId = req.user.id;
    const {follwingId} = req.body;

    try{
        await repository.follow(followerId,follwingId);
        res.status(200).json({ message: '팔로우 성공' });
    }catch (err) {
        res.status(500).json({ message: '에러 발생', error: err });
      }
}
exports.unfollow = async (req,res)=>{
    const followerId = req.user.id;
    const {followingId} = req.body;

    try{
        await repository.unfollow(followerId,followingId);
        res.status(200).json({ message: '언팔로우 성공' });
    }catch (err) {
        res.status(500).json({ message: '에러 발생', error: err });
      }
}

exports.getfollowing = async (req,res)=>{
  const {myId} = req.body;
    try{
        
        const [rows] =await repository.getfollowing(myId);
        res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err });
    }
}
exports.getfollow = async (req,res)=>{
    const {myId} = req.body;
    try{
        const [rows] =await repository.getfollow(myId);
        res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err });
    }
}
exports.isFollowing = async (req, res) => {
    const myId = parseInt(req.user.id);
    const { targetId } = req.body;
  
    try {
      const [rows] = await repository.isFollowing(myId, targetId);
        if(rows==null){
            res.json({ isFollowing: false });
        }
        else{
            res.json({ isFollowing: true });
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
  };

  exports.getFollowCount = async (req, res) => {
    const {userId} = req.body;
    try {
      const [followers] = await repository.countFollowers(userId);
      const [followings] = await repository.countFollowings(userId);
      res.json({
        followerCount: followers[0].count,
        followingCount: followings[0].count,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };
  
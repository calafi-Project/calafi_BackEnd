const repository = require('./repository');

exports.getExercise = async (req,res)=>{
    try{
        const data = await repository.getExercise();
        res.json(data);
    }catch(err){
        res.json(err);
    }
}

exports.SearchExercise = async (req,res)=>{
    try{
        const {searchTerm} = req.body;
        const data = await repository.searchExercise(searchTerm);
        res.json(data);
    }catch(err){
        res.json(err);
    }
};

exports.commentsExercise = async (req,res)=>{
    try{
        const {exercise_id,user_id,content}=req.body;
        const data = await repository.commentExercise(exercise_id,user_id,content);
        res.statusCode(200).json(data);
    }
    catch(err)
    {
        res.json(err)
    }
}

exports.getCommentExercise=  async (req,res)=>{
    try{
        const { exercise_id } = req.body;
        const data = await repository.getCommentExercise(exercise_id)
        res.json(data);
    }catch(err){
        res.json(err);
    }
}

// 운동 추가
exports.addExerciseToSchedule = async (req, res) => {
    const userId = req.user.id;
    const { videoId } = req.body;
  
    try {
      await repository.addExerciseSchedule(userId, videoId);
      res.json({ message: '운동 추가 완료' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  };
  
  // 운동 삭제
  exports.removeExerciseFromSchedule = async (req, res) => {
    const userId = req.user.id;
    const { videoId } = req.body;
  
    try {
      await repository.removeExerciseSchedule(userId, videoId);
      res.json({ message: '운동 삭제 완료' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  };
  
  // 등록한 운동 목록 조회
  exports.getMyExerciseSchedule = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const [rows] = await repository.getMyExerciseSchedule(userId);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 오류' });
    }
  };
  
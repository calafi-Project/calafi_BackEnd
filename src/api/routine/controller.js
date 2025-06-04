const repository = require('./repository');

exports.getRoutines = async (req, res) => {
    try {
      let { ids } = req.body;
      ids = ids.split(',').map(id => parseInt(id, 10));
      if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
        return res.status(400).json({ error: 'ids는 숫자 배열이어야 합니다.' });
      }
      const data = await repository.getRoutines(ids);
      res.json(data);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: '서버 오류' });
    }
  };


//루틴 검색
exports.Searchroutine = async (req,res)=>{
    try{
        const {searchTerm} = req.body;
        const data = await repository.searchRoutine(searchTerm);
        res.json(data);
    }catch(err){
        res.json(err);
    }
};

//루틴 상세 페이지

exports.routineDetail = async (req,res)=>{
  try{
    const {routineId} = req.body;
    const data = await repository.routineDetail(routineId) ;
    return res.json(data);
  }catch(err){
    return res.json(err);
  }
}



//루틴 댓글

exports.commentRoutine = async (req, res) => {
  try {
      const { routine_id, user_id, content } = req.body;  // 요청 본문에서 필요한 값 추출
      const data = await repository.commentRoutine(routine_id, user_id, content);  // 댓글 작성 함수 호출
      res.status(200).json(data);  // 성공적으로 댓글 작성된 후 응답
  } catch (err) {
      res.status(500).json({ error: err.message });  // 오류 발생 시 응답
  }
};
exports.getCommentRoutine = async (req, res) => {
  try {
      const { routine_id } = req.body;  // URL 파라미터로 루틴 ID 받기
      const data = await repository.getCommentRoutine(routine_id);  // 댓글 조회 함수 호출
      res.json(data);  // 댓글 목록 응답
  } catch (err) {
      res.status(500).json({ error: err.message });  // 오류 발생 시 응답
  }
};

exports.likeRoutine = async (req,res)=>{
  const userId = req.user.id;
  const {routineId} = req.body;
  
  try{
    // 중복 좋아요 방지 위해 INSERT IGNORE 또는 존재 여부 체크 후 삽입 가능
    const result = await repository.likeRoutine(userId,routineId);
    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: '이미 좋아요한 루틴입니다.' });
    }
    await repository.updateHeart(routineId);
    res.json({ message: '좋아요 완료' });
  }catch(err){
    res.json(err);
  }
}

exports.unlikeRoutine =async (req,res)=>{
  const userId = req.user.id;
  const {routineId} = req.body;

  try{
    const result = await repository.deleteHeart(userId,routineId);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: '좋아요하지 않은 루틴입니다.' });
    }
    await repository.deletelike(routineId);
    res.json({message:'좋아요 취소 완료'});
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
}

exports.joinLike = async (req,res)=>{
  const {userId} = req.body;

  try{
    const created = await repository.joinLike(userId);
    const liked = await repository.joinlikeRoutine(userId);
    res.json({
      created_routines: created,
      liked_routines: liked,
    });
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
}

// 요일별 루틴 추가
exports.addRoutineToSchedule = async (req, res) => {
  const userId = req.user.id;
  const { routineId, weekday } = req.body;

  try {
    await repository.addSchedule(userId, routineId, weekday);
    res.json({ message: '요일 루틴 추가 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.removeRoutineFromSchedule = async (req, res) => {
  const userId = req.user.id;
  const { routineId, weekday } = req.body;

  try {
    await repository.removeSchedule(userId, routineId, weekday);
    res.json({ message: '요일 루틴 삭제 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};


exports.getRoutinesByWeekday = async (req, res) => {
  const userId = req.user.id;
  const { weekday } = req.body; // GET /routines/weekday/3

  try {
    const [rows] = await repository.getRoutinesByWeekday(userId, weekday);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};


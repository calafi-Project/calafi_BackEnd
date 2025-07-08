const repository = require('./repository');

exports.getRoutines = async (req, res) => {
    try {
      let { ids } = req.body;
      ids = ids.split(',').map(id => parseInt(id, 10));
      if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
        return res.status(400).json({ error: 'ids는 숫자 배열이어야 합니다.' });
      }
      const [rows] = await repository.getRoutines(ids);
      res.json(rows);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: '서버 오류' });
    }
  };
  exports.getRoutinesDetail = async (req, res) => {
    try {
      let { ids } = req.body;
      if (typeof ids === 'string') {
        ids = ids.split(',').map(id => parseInt(id, 10));
      }
      if (!Array.isArray(ids) || ids.some(id => isNaN(id))) {
        return res.status(400).json({ error: 'ids는 숫자 배열이어야 합니다.' });
      }
      const [rows] = await repository.getRoutineDetailsByRoutineIds(ids);
      res.json(rows);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: '서버 오류' });
    }
  };
  

//루틴 검색
exports.Searchroutine = async (req,res)=>{
    try{
        const {searchTerm} = req.body;
        const [rows] = await repository.searchRoutine(searchTerm);
        res.json(rows);
    }catch(err){
        res.json(err);
    }
};

//루틴 상세 페이지

exports.routineDetail = async (req,res)=>{
  try{
    const {routineId} = req.body;
    const [rows] = await repository.routineDetail(routineId) ;
    return res.json(rows);
  }catch(err){
    return res.json(err);
  }
}



//루틴 댓글

exports.commentRoutine = async (req, res) => {
 
  try {
      const userId = req.user.id;
      const { routine_id, content } = req.body;  // 요청 본문에서 필요한 값 추출
      const [rows] = await repository.commentRoutine(routine_id, userId, content);  // 댓글 작성 함수 호출
      res.status(200).json(rows);  // 성공적으로 댓글 작성된 후 응답
  } catch (err) {
      res.status(500).json({ error: err.message });  // 오류 발생 시 응답
  }
};
exports.getCommentRoutine = async (req, res) => {
  try {
      const { routine_id } = req.body;  // URL 파라미터로 루틴 ID 받기
      const [rows] = await repository.getCommentRoutine(routine_id);  // 댓글 조회 함수 호출
      res.json(rows);  // 댓글 목록 응답
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

exports.joinLike = async (req, res) => {
  const { userId } = req.body;

  try {
    const [created] = await repository.joinLike(userId);
    const [liked] = await repository.joinlikeRoutine(userId);

    // 배열 합치기
    const merged = [...created, ...liked];

    res.json(merged);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};


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

exports.createRoutine = async (req, res) => {
  const { name, description, tags } = req.body;
  const userId = req.user.id;
  try {
    const insertId = await repository.createRoutine(userId, name, description, tags);
    res.status(201).json({ routine_id: insertId });
  } catch (error) {
    console.error("루틴 생성 오류:", error);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.addVideosToRoutine = async (req, res) => {
  const { routineId, videoIds, count } = req.body;

  try {
    const videoIdArray = typeof videoIds === 'string'
      ? videoIds.split(',').map(id => parseInt(id))
      : videoIds;

    const countArray = typeof count === 'string'
      ? count.split(',').map(c => parseInt(c))
      : count;

    await repository.addVideosToRoutine(routineId, videoIdArray, countArray);
    res.status(200).json({ message: '영상들이 루틴에 추가되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};


exports.joinRoutineExercise = async (req, res) => {
  const userId = req.user.id;

  try {
    const [created] = await repository.joinLike(userId);
    const [exercise] = await repository.joinExercise(userId);

    res.json({
      routines: created,
      exercise: exercise,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};
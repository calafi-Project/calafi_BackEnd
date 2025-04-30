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

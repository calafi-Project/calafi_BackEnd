const repository = require('./repository');

exports.getExercise = async (req,res)=>{
    try{
        const [rows] = await repository.getExercise();
        res.json(rows);
    }catch(err){
        res.json(err);
    }
}

exports.SearchExercise = async (req,res)=>{
    try{
        const {searchTerm} = req.body;
        const [rows] = await repository.searchExercise(searchTerm);
        res.json(rows);
    }catch(err){
        res.json(err);
    }
};

exports.commentsExercise = async (req,res)=>{
    const userId = req.user.id;
    try{
        const {exercise_id,content}=req.body;
        const [rows] = await repository.commentExercise(exercise_id,userId,content);
        res.statusCode(200).json(rows);
    }
    catch(err)
    {
        res.json(err)
    }
}

exports.getCommentExercise=  async (req,res)=>{
    try{
        const { exercise_id } = req.body;
        const [rows] = await repository.getCommentExercise(exercise_id)
        res.json(rows);
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
exports.getExerciseDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await repository.getExerciseDetail(id);

    if (rows.length === 0) return res.status(404).json({ error: '운동을 찾을 수 없습니다.' });

    // 운동 기본 정보
    const exercise = {
      id: rows[0].exercise_id,
      name: rows[0].name,
      description: rows[0].description,
      guide: rows[0].guide,
      need: rows[0].need,
      image_url: rows[0].image_url,
      videos: []
    };

    // 영상 정보 추가
    rows.forEach(row => {
      if (row.video_id) {
        exercise.videos.push({
          id: row.video_id,
          title: row.video_title,
          video_url: row.video_url,
          created_at: row.created_at,
          creator_name: row.creator_name,
          creator_profile: row.creator_profile
        });
      }
    });

    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: '서버 오류', detail: err });
  }
};

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

exports.uploadVideoHandler = [
  upload.single('video'), // 'video' 필드명과 맞춰야 함
  async (req, res) => {
    const { exercise_id, title } = req.body;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: '영상 파일이 필요합니다.' });
    }

    // 업로드된 파일 경로 예: /uploads/1234567890.mp4
    const video_url = `/uploads/${req.file.filename}`;

    try {
      await repository.addExerciseVideo(exercise_id, title, video_url, userId);
      res.status(201).json({ message: "운동에 영상이 추가되었습니다." });
    } catch (error) {
      console.error("운동 영상 추가 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  }
];

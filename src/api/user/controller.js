const repository = require('./repository');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        const [[user]] = await repository.getUser(req.user.id);
        const [[userAct]] = await repository.getUserAct(req.user.id);
        console.log("id : " + req.user.id);

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        console.log('user:', user);
        console.log('userAct:', userAct);
        
        res.json({
          id : user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          height: user.height,
          weight: user.weight,
          profile_image: user.profile_image,
          grade: user.grade,
          work_time: userAct ? userAct.work_time : 0,
          complete_routine: userAct ? userAct.complete_routine : 0,
          calori_burned: userAct ? userAct.calori_burned : 0,
          isroutine: userAct ? userAct.isroutine : 0,
          isworkout: userAct ? userAct.isworkout : 0,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.updateUserPhysical = async (req, res) => {
  const userId = req.user.id;
  const { height, weight } = req.body;

  if (height == null || weight == null)
    return res.status(400).json({ message: "키와 몸무게를 모두 입력해주세요." });

  try {
    await repository.updatePhysical(userId, height, weight);
    res.json({ message: "정보가 성공적으로 업데이트되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
};

exports.updateUserPassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "현재 비밀번호와 새 비밀번호를 입력해주세요." });

  try {
    const [user] = await repository.getUserPassword(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "현재 비밀번호가 일치하지 않습니다." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await repository.updatePassword(userId, hashed);
    res.json({ message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
};

// isroutine 반전
exports.toggleIsRoutine = async (req, res) => {
  const userId = req.user.id;

  try {
    const row = await repository.getRoutineFlag(userId);
    if (!row) return res.status(404).json({ message: row });

    const newValue = row.isroutine === 0 ? 1 : 0;
    await repository.updateRoutineFlag(userId, newValue);
    res.json({ message: "is_routine 값이 변경되었습니다.", is_routine: newValue });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err });
  }
};

// isworkout 반전
exports.toggleIsWorkout = async (req, res) => {
  const userId = req.user.id;

  try {
    const row = await repository.getWorkoutFlag(userId);
    if (!row) return res.status(404).json({ message:row });

    const newValue = row.isworkout === 0 ? 1 : 0;
    await repository.updateWorkoutFlag(userId, newValue);
    res.json({ message: "is_workout 값이 변경되었습니다.", is_workout: newValue });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err });
  }
};


exports.getState = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  
  try {
    const [row] = await repository.getVisibilityFlags(userId);
    if (!row) return res.status(404).json({ message: "userAct 정보 없음" });

    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류", error: err });
  }
};

exports.getUserOverview = async (req, res) => {
  const { userId } = req.body;
  const viewerId = req.user.id;
  try {
    const data = await repository.getUserOverview(userId,viewerId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};

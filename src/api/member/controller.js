const repository = require('./repository');

exports.getMemberInfo = async (req, res) => {
  const {memberIds} = req.body; // or req.body.memberId
  const myId = parseInt(req.user?.id);

  if (isNaN(memberIds) || isNaN(myId)) {
    return res.status(400).json({ message: "잘못된 사용자 ID입니다." });
  }

  try {
    const memberId= parseInt(memberIds);

    // 회원 정보
    const [userRows] = await repository.userRows(memberId);
    if (userRows.length === 0) return res.status(404).json({ message: "사용자 없음" });
    console.log(userRows);
    // 팔로우 여부
    const [followRows] = await repository.followRows(myId, memberId);

    // 활동 정보
    const [activityRows] = await repository.activityRows(memberId);

    // 공개 루틴
    const [routineRows] = await repository.routineRows(memberId);

    // 공개 운동
    const [videoRows] = await repository.videoRows(memberId);

    res.json({
      user: {
        ...userRows[0],
        is_following: followRows[0]?.is_following > 0
      },
      activity: activityRows[0] || {
        work_time: 0,
        complete_routine: 0,
        calori_burned: 0
      },
      public_routines: routineRows,
      public_workouts: videoRows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 에러", error: err });
  }
};

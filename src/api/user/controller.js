const repository = require('./repository');

exports.getUser = async (req, res) => {
    try {
        const [user] = await repository.getUser(req.user.id);
        const [userAct] = await repository.getUserAct(req.user.id);
        console.log("id : " + req.user.id);

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        const mergedData = {
            name: user?.name,
            age: user?.age,
            height: user?.height,
            weight: user?.weight,
            work_time: userAct?.work_time ?? 0,
            grade: user?.grade,
            profile_image: user?.profile_image,
            complete_routine: userAct?.complete_routine ?? 0,
            calori_burned: userAct?.calori_burned ?? 0,
            isroutine: userAct?.isroutine ?? 0,
            isworkout: userAct?.isworkout ?? 0,
        };

        res.json(mergedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
};

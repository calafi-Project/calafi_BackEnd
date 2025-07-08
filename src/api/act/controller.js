const repository = require('./repository');
exports.updateCaloris = async (req, res) => {
    try {
        const userId = req.user.id;
        const { calori } = req.body;
        const [rows] = await repository.updateCalori(calori, userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
};

exports.updateWorks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { worktime } = req.body;
        const [rows] = await repository.updateWork(worktime, userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
};

exports.updateRoutines = async (req, res) => {
    try {
        const userId = req.user.id;
        const { routine } = req.body;
        const [rows] = await repository.updateRoutine(routine, userId);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
};
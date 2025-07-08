const repository = require('./repository');

exports.allSearch = async (req, res) => {
  const { searchTerm } = req.body;
  const currentUserId = req.user.id;  // JWT 등 인증으로부터 가져옴

  if (!searchTerm) return res.status(400).json({ error: '검색어를 입력하세요.' });

  try {
    const [exercises] = await repository.searchExercise(searchTerm, currentUserId);
    const [routines] = await repository.searchRoutine(searchTerm, currentUserId);
    const [users] = await repository.searchMember(searchTerm, currentUserId);

    res.json({ exercises, routines, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.VideoSearch = async (req, res) => {
  const { searchTerm } = req.body;
  const currentUserId = req.user.id;  // JWT 등 인증으로부터 가져옴

  if (!searchTerm) return res.status(400).json({ error: '검색어를 입력하세요.' });

  try {
    const [video] = await repository.searchVideo(searchTerm, currentUserId);

    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
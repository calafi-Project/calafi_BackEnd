const repository = require('./repository');

exports.allSearch = async (req,res)=>{
  const {searchTerm} = req.body;
  if (!searchTerm) return res.status(400).json({ error: '검색어를 입력하세요.' });

  try{
    const exercises = await repository.searchExsercise(searchTerm);
    const routines = await repository.searchRutine(searchTerm);
    const users = await repository.searchMember(searchTerm);
    console.log(exercises);
    console.log(routines);
    console.log(users);
    res.json({exercises,routines,users});
  }catch(err){
    res.json(err);
  }
}

const repository = require('./repository');

exports.getExercise = async (req,res)=>{
    try{
        const data = await repository.getExercise();
        res.json(data);
    }catch(err){
        res.json(err);
    }
}

exports.SearchExercise = async (req,res)=>{
    try{
        const {searchTerm} = req.body;
        const data = await repository.searchExercise(searchTerm);
        res.json(data);
    }catch(err){
        res.json(err);
    }
};

exports.commentsExercise = async (req,res)=>{
    try{
        const {exercise_id,user_id,content}=req.body;
        const data = await repository.commentExercise(exercise_id,user_id,content);
        res.statusCode(200).json(data);
    }
    catch(err)
    {
        res.json(err)
    }
}

exports.getCommentExercise=  async (req,res)=>{
    try{
        const { exercise_id } = req.body;
        const data = await repository.getCommentExercise(exercise_id)
        res.json(data);
    }catch(err){
        res.json(err);
    }
}
  
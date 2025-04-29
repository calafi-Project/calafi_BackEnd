const express = require('express');
const router = express.Router();
const authMiddleWare = require('./middleware/auth');
const signController = require('./api/sign/controller');
router.post('/sign',signController.signUp);

const loginController = require('./api/login/controller');
router.post('/login',loginController.login);

const userController = require('./api/user/controller');
router.get('/getUser',authMiddleWare,userController.getUser);

const exerciseController =require('./api/exercise/controller');
router.get('/exercise',authMiddleWare,exerciseController.getExercise);
router.post('/exercise/search',authMiddleWare,exerciseController.SearchExercise);
router.post('/exercise/comment',authMiddleWare,exerciseController.commentsExercise);
router.post('/exercise/getComment',authMiddleWare,exerciseController.getCommentExercise);

module.exports= router;
const express = require('express');
const router = express.Router();
const authMiddleWare = require('./middleware/auth');
const signController = require('./api/sign/controller');
router.post('/sign',signController.signUp);

const loginController = require('./api/login/controller');
router.post('/login',loginController.login);

const userController = require('./api/user/controller');
router.get('/getUser',authMiddleWare,userController.getUser);
router.post('/updatePhsical',authMiddleWare,userController.updateUserPhysical);
router.post('/updatepassword',authMiddleWare,userController.updateUserPassword);
router.post('/update/IsRoutine',authMiddleWare,userController.toggleIsRoutine);
router.post('/update/IsWorkout',authMiddleWare,userController.toggleIsWorkout);
router.get('/status',authMiddleWare,userController.getState);

const exerciseController =require('./api/exercise/controller');
router.get('/exercise',authMiddleWare,exerciseController.getExercise);
router.post('/exercise/search',authMiddleWare,exerciseController.SearchExercise);
router.post('/exercise/comment',authMiddleWare,exerciseController.commentsExercise);
router.post('/exercise/getComment',authMiddleWare,exerciseController.getCommentExercise);
router.post('/exercise/addExSc',authMiddleWare,exerciseController.addExerciseToSchedule);
router.post('/exercise/reExSc',authMiddleWare,exerciseController.removeExerciseFromSchedule);
router.post('/exercise/getExSc',authMiddleWare,exerciseController.getMyExerciseSchedule);

const routineController = require('./api/routine/controller');
router.post('/routine/routines',authMiddleWare,routineController.getRoutines);
router.post('/routine/search',authMiddleWare,routineController.Searchroutine);
router.post('/routine/detail',authMiddleWare,routineController.routineDetail);
router.post('/routine/comment',routineController.commentRoutine);
router.post('/routine/getcomment',routineController.getCommentRoutine);
router.post('/routine/like',authMiddleWare,routineController.likeRoutine);
router.post('/routine/unlike',authMiddleWare,routineController.unlikeRoutine);
router.post('/routine/joinRoutine',authMiddleWare,routineController.joinLike);
router.post('/routine/addRoSc', authMiddleWare,routineController.addRoutineToSchedule);
router.delete('/routine/reRoSc',authMiddleWare, routineController.removeRoutineFromSchedule);
router.get('/routine/getRoSc',authMiddleWare, routineController.getRoutinesByWeekday);

const followController = require('./api/follow/controller');
router.post('/follow/follow',authMiddleWare,followController.follow);
router.post('/follow/unfollow',authMiddleWare,followController.unfollow);
router.get('/follow/getfollowing',authMiddleWare,followController.getfollowing);
router.get('/follow/getfollow',authMiddleWare,followController.getfollow);
router.post('/follow/isFollowing',authMiddleWare,followController.isFollowing);

const searchController = require('./api/search/controller');
router.post('/search',authMiddleWare,searchController.allSearch);

module.exports= router;

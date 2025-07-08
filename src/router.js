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
router.post('/user/getUser',authMiddleWare,userController.getUserOverview);

const exerciseController =require('./api/exercise/controller');
router.get('/exercise',authMiddleWare,exerciseController.getExercise);
router.post('/exercise/search',authMiddleWare,exerciseController.SearchExercise);
router.post('/exercise/comment',authMiddleWare,exerciseController.commentsExercise);
router.post('/exercise/getComment',authMiddleWare,exerciseController.getCommentExercise);
router.post('/exercise/addExSc',authMiddleWare,exerciseController.addExerciseToSchedule);
router.post('/exercise/reExSc',authMiddleWare,exerciseController.removeExerciseFromSchedule);
router.post('/exercise/getExSc',authMiddleWare,exerciseController.getMyExerciseSchedule);
router.get('/exercise/:id', exerciseController.getExerciseDetail);
router.post('/exercise/addVideo',authMiddleWare,exerciseController.uploadVideoHandler);

const routineController = require('./api/routine/controller');
router.post('/routine/routines',authMiddleWare,routineController.getRoutines);
router.post('/routine/search',authMiddleWare,routineController.Searchroutine);
router.post('/routine/detail',authMiddleWare,routineController.routineDetail);
router.post('/routine/comment',authMiddleWare,routineController.commentRoutine);
router.post('/routine/getcomment',routineController.getCommentRoutine);
router.post('/routine/like',authMiddleWare,routineController.likeRoutine);
router.post('/routine/unlike',authMiddleWare,routineController.unlikeRoutine);
router.post('/routine/joinRoutine',authMiddleWare,routineController.joinLike);
router.post('/routine/addRoSc', authMiddleWare,routineController.addRoutineToSchedule);
router.delete('/routine/reRoSc',authMiddleWare, routineController.removeRoutineFromSchedule);
router.post('/routine/getRoSc',authMiddleWare, routineController.getRoutinesByWeekday);
router.post('/routine/addVideosToRoutine',authMiddleWare,routineController.addVideosToRoutine)
router.post('/routine/createRoutine',authMiddleWare,routineController.createRoutine)
router.get('/routine/joinExerciseRoutine',authMiddleWare,routineController.joinRoutineExercise);
router.post('/routine/getdetail',authMiddleWare,routineController.getRoutinesDetail);

const followController = require('./api/follow/controller');
router.post('/follow/follow',authMiddleWare,followController.follow);
router.post('/follow/unfollow',authMiddleWare,followController.unfollow);
router.post('/follow/getfollowing',authMiddleWare,followController.getfollowing);
router.post('/follow/getfollow',authMiddleWare,followController.getfollow);
router.post('/follow/isFollowing',authMiddleWare,followController.isFollowing);
router.post('/follow/count', followController.getFollowCount);

const searchController = require('./api/search/controller');
router.post('/search',authMiddleWare,searchController.allSearch);
router.post('/search/video',authMiddleWare,searchController.VideoSearch);

const actController = require('./api/act/controller');
router.post('/act/routine',authMiddleWare,actController.updateRoutines);
router.post('/act/calori',authMiddleWare,actController.updateCaloris);
router.post('/act/work',authMiddleWare,actController.updateWorks);


module.exports= router;

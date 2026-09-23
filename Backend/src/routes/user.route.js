const express = require('express');
const authMiddleware = require('../middlewares/auth.middileware');
const authMentorMiddleware = require('../middlewares/authMentor.middileware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post("/questions", authMiddleware.authuser, userController.postQuestion);
router.post("/question/:questionId/reply", authMiddleware.authuser, userController.reply);

router.get("/question/:questionId/replies", authMiddleware.authuser, userController.allReplies);

router.get("/u/:id", authMiddleware.authuser, userController.findUser);
router.get("/mentors", authMiddleware.authuser, userController.getAllMentor);

router.get("/questions/student",authMiddleware.authuser, userController.myQuestions);
router.get("/questions/mentor",authMentorMiddleware.authMentor, userController.recievedQuestions);

router.get("/questions/:questionId", authMiddleware.authuser, userController.oneQuestion);

router.patch("/questions/:questionId/close", authMiddleware.authuser, userController.closeQuestion);

router.post("/newMentor", userController.newMentor);

router.patch("/updateProfile", authMentorMiddleware.authMentor, userController.updateProfile);

module.exports = router;
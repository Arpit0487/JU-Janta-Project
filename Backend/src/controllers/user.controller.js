const userModel = require("../models/user.model");
const questionModel = require("../models/question.model");
const replyModel = require("../models/reply.model");
const newMentorModel = require("../models/becomeMentor.model");

async function findUser(req, res) {
  const { id } = req.params;

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User Not Found.",
    });
  }

  return res.status(200).json({
    user,
  });
}

async function getAllMentor(req, res) {
  const mentors = await userModel.find({ role: "mentor" }).select("-password");
  return res.status(200).json({
    message: "Mentors fetched successfully",
    mentors: mentors,
  });
}

async function postQuestion(req, res) {
  const { title, description, mentor } = req.body;

  if (req.user.id.toString() === mentor.toString()) {
        return res.status(400).json({
            message: "You cannot send a question to yourself."
        });
  }

  const question = await questionModel.create({
    title,
    description,
    student: req.user.id,
    mentor,
    status: "pending",
  });

  res.status(201).json({
    message: "Message sent successfully",
    question,
  });
}

async function myQuestions(req, res) {
  const id = req.user.id;
  const messages = await questionModel
    .find({ student: id })
    .populate("mentor", "username avatar")
    .sort({ createdAt: -1 });

  if (messages.length === 0) {
    return res.status(404).json({
      message: "No messages found.",
    });
  }

  return res.status(200).json({
    message: "Past messages fetched successfully.",
    messages,
  });
}

async function recievedQuestions(req, res) {
  const id = req.user.id;

  const messages = await questionModel
  .find({ mentor: id })
  .populate("student", "username avatar")
  .select("title description student status")
  .sort({ createdAt: -1 });

  if (messages.length === 0) {
    return res.status(404).json({
      message: "No messages found.",
    });
  }

  return res.status(200).json({
    message: "All Questions fetched successfully.",
    messages,
  });
}

async function reply(req, res) {
  const { content } = req.body;

  const question = await questionModel.findById(req.params.questionId);

  if (!question) {
    return res.status(404).json({
      message: "Question not found",
    });
  }

  if (
    question.student.toString() !== req.user.id &&
    question.mentor.toString() !== req.user.id
  ) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  const replyMessage = await replyModel.create({
    question: question._id,
    sender: req.user.id,
    content,
  });

  await questionModel.findByIdAndUpdate(question._id, { status: "answered" });

  return res.status(200).json({
    message: "Reply sent successfully",
    replyMessage,
  });
}

async function allReplies(req, res) {
  const { questionId } = req.params;

  const question = await questionModel.findById(questionId);

  if (!question) {
    return res.status(404).json({
      message: "question not found.",
    });
  }

  if (
    question.student.toString() !== req.user.id &&
    question.mentor.toString() !== req.user.id
  ) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }
  
  const replies = await replyModel
    .find({ question: questionId })
    .populate("sender", "username role")
    .populate("question", "title status")
    .sort({ createdAt: 1 });

  //.sort({ createdAt: -1 }) If You Want Newest First

  if (replies.length === 0) {
    return res.status(404).json({
      message: "No replies found.",
    });
  }

  return res.status(200).json({
    message: "All replies fetched successfully.",
    replies,
  });
}

async function closeQuestion(req, res) {

  const question = await questionModel.findById(req.params.questionId);

  if (!question) {
    return res.status(404).json({
      message: "Question not found."
    });
  }

  if (question.student.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Only the student who created the question can close it."
    });
  }

  await questionModel.findByIdAndUpdate(
    req.params.questionId,
    { status: "closed" }
  );

  return res.status(200).json({
    message: "Topic closed."
  });
}

async function oneQuestion(req, res) {
  const { questionId } = req.params;

  const question = await questionModel.findById(questionId);

  if (!question) {
    return res.status(404).json({
      message: "Question not found.",
    });
  }

  if (
    question.student.toString() !== req.user.id &&
    question.mentor.toString() !== req.user.id
  ) {
    return res.status(403).json({
      message: "Unauthorized access",
    });
  }

  const populatedQuestion  = await questionModel
  .findById(questionId)
  .populate("student", "username avatar")
  .populate("mentor", "username avatar");

  return res.status(200).json({
    message: "Question fetched successfully.",
    populatedQuestion,
  });
}

async function newMentor(req,res){
  const {name, email,contact, year, course, branch, cgpa, github, linkedIn, graduation} = req.body;

  await newMentorModel.create({
    name,
    email,
    contact,
    year,
    course,
    branch,
    cgpa,
    github,
    linkedIn,
    graduation,
    status : "applied"
  });

  return res.status(200).json({
    message: "Applied successfully."
  });
}

async function updateProfile(req, res) {
  const userId = req.user.id;

  const {
    username,
    currentYear,
    bio,
    course,
    branch,
    year,
    linkedin,
    github,
    leetcode,
    project,
    codolioCollege,
  } = req.body;
  console.log(req.body);
  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.role !== "mentor") {
    return res.status(403).json({
      message: "Only mentors can update profile",
    });
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      username,
      currentYear,
      bio,
      course,
      branch,
      year,
      linkedin,
      github,
      leetcode,
      project,
      codolioCollege,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  return res.status(200).json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
}

module.exports = {
  findUser,
  getAllMentor,
  postQuestion,
  myQuestions,
  recievedQuestions,
  reply,
  allReplies,
  closeQuestion,
  oneQuestion,
  newMentor,
  updateProfile,
};

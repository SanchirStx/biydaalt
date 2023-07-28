const Comment = require("../model/comment");

exports.createComment = async (req, res) => {
  const name = req.body.comment;
  try {
    const newComment = await Comment.create({
      comment: name
    });
    res.status(201).json({ 
      success: true,
      newComment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.getAllComment = async (req, res, next) => {
  try {
    const allComment = await Comment.find();
    res.status(200).json({
      success: true,
      allComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ 
        success: false,
        error: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        error: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      deletedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
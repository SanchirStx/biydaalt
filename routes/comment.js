const express = require('express');


const router = express.Router();
const { createComment,  getComment, deleteComment } = require('../controller/commentController');
const { Logger } = require('../middleware/logger'); 

router.route('/')
  .post(createComment);

router.route('/:id')  
  .get(getComment).delete(deleteComment);

module.exports = router;
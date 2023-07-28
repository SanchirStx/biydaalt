const express = require('express');


const router = express.Router();
const { createCategory, getAllCategory, getCategory, putCategory ,deleteCategory } = require('../controller/categoryController');
const { Logger } = require('../middleware/logger'); 
const { checkAdminRole } = require('../middleware/admin');
const { Upload } = require('../middleware/upload');

router.route('/')
  .post(Upload.single('image'), createCategory)
  .get(getAllCategory)
  .put(putCategory);

router.route('/:id')  
  .get(getCategory)
  .delete(deleteCategory);

module.exports = router;
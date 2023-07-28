const express = require('express');
const router = express.Router();
const {register, Login, addToSave, getSave, deleteSave} = require("../controller/userController");
const { Logger } = require("../middleware/logger");

router.route("/").post(register)
router.route('/login').post(Login)
router.route("/Save").post(Logger, addToSave).get(Logger, getSave).delete(Logger, deleteSave)

module.exports = router
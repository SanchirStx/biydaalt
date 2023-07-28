const userModel = require("../model/userModel");
const UserSchema = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await UserSchema.create({
      email,
      password,
      role: role || "ordinary",
    });
    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error, 
    });
  }
};


exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email: email });
  try {
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "нууц үг болон э-мэйлээ шалгана уу" ,
      });
    }
    const check = await user.CheckPassword(password);
    if (!check) {
      return res.status(404).json({
        success: false,
        error: "нууц үг болон э-мэйлээ шалгана уу" ,
      });
    }
    console.log(user);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.addToSave = async (req, res) => {
  const { productId } = req.body;
  const email = req.userEmail;
  try {
    const addList = await userModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { save: productId } }
    );

    res.status(200).json({
      success: true,
      addList,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};
exports.getSave = async (req, res) => {
  try {
    console.log(req.userEmail);
    const List = await userModel
      .findById(req.userId)
      .select("Save")
      .populate("Save")
      .exec();
    res.status(200).json({
      success: true,
      List,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.deleteSave = async (req, res) => {
  try {
    console.log(req.userEmail);

    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { save: [] },
      { new: true }
    )
      .select("Save")
      .populate("Save")
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Cannot find the user',
      });
    }

    if (!user.save || user.save.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'Save is empty',
        List: [],
      });
    }

    res.status(200).json({
      success: true,
      List: user.save,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
};

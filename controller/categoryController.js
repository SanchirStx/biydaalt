const asyncHandler = require("../middleware/asyncHandler")
const Category = require("../model/category");
const category = require("../model/category");

const checkAdminRole = (req,res,next) => {
  if(req.user.role === "admin"){
  }else{
    res.status(404).json({
      success:false,
      error:"Only denied users can create a category"
    })
  }
}
  
    exports.createCategory = asyncHandler( checkAdminRole,async (req, res) => {
      const name = req.body.category;
      const filename = req.file;
      try {
        const newCategory = await Category.create({
          category: name,
          image: filename,
        });
        res.status(200).json({
          success: true,
          newCategory,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error,
        });
      }
      console.log(req.body.filename)
    });

exports.getAllCategory = async (req, res, next) => {
  try {
    const allCategory = await Category.find();
    res.status(200).json({
      success: true,
      allCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.putCategory = async(req,res,next) => {
  try{
    const putCategory = await Category.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
      success: true,
      putCategory,
    }) 
}catch(error){
  res.status(404).json({
    success:false,
    error
  })
}};

exports.deleteCategory = asyncHandler( async (req, res) => {
  const name = req.body.category;
  const filename = req.file.filename;
  try {
    const newCategory = await Category.delete({
      category: name,
      image: filename,
    });
    res.status(200).json({
      success: false,
      newCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      error,
    });
  }
});
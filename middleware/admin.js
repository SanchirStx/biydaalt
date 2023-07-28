const checkAdminRole = (req,res,next) => {
    if(req.user.role === "admin"){
    }else{
        res.status(404).json({
            success: false,
            error:"Access denied. Only admin users can create a category"
        })
    }
}
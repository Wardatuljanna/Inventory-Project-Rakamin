const { User } = require("../../../../models")

module.exports = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId,{
        attributes:{
            exclude: ["password"]
          }  
    });

    if (!user)
        return res.status(404).json({
            success: false,
            message: "User not found"
        });

    return res.json(user)
}
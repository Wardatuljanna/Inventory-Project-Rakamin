const { User } = require("../../../models")

// GET all users data

module.exports = async (req, res)=>{
  const user = await User.findAll({
    attributes:{
      exclude: ["password"]
    }
  });
  return res.json(user)
};

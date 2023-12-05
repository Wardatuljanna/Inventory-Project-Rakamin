const { Product, Version, User, Log } = require("../../../models")

// GET all Product data

module.exports = async (req, res)=>{

  const data = await Product.findAll({include:[Version, User, Log]});
  
  return res.json(data)
};
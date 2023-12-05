const { Version } = require("../../../models")

// GET all versions data

module.exports = async (req, res)=>{
  const data = await Version.findAll();
  return res.json(data)
  
};

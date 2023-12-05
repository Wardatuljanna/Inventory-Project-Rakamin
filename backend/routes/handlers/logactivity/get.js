const { Log, User, Version, Product } = require("../../../models")

// GET all logs data

module.exports = async (req, res) => {
  const log = await Log.findAll({
    include: [ {
      model: User,
      required: true,
    }, {
      model: Product,
      required: true,
      include: [Version]
    }]
  });
  return res.json(log)
};

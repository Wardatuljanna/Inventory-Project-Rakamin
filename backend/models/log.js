'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      Log.belongsTo(models.User)
      Log.belongsTo(models.Product)
    }
  }
  Log.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};
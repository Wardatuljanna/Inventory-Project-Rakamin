'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    Product.belongsTo(models.Version)
    Product.belongsTo(models.User)
    Product.hasMany(models.Log)
    }
  }
  Product.init({
    versionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productName: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
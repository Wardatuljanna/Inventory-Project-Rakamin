'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Version extends Model {
    static associate(models) {
    }
  }
  Version.init({
    nameVersion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Version',
  });
  return Version;
};
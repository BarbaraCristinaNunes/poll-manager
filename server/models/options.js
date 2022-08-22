'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Options.init({
    label: DataTypes.STRING,
    score: DataTypes.INTEGER,
    pollid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Options',
  });
  return Options;
};
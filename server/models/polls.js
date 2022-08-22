'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Polls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Polls.init({
    title: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    status: {
      type: DataTypes.VIRTUAL,
      get() {
        if (!this.start || !this.end) {
          return;
        }
        const today = new Date().getTime();
        const start = new Date(this.start).getTime();
        const end = new Date(this.end).getTime();
        if(today < start){
          return {status: "Não iniciada", disabled: true};
        }else if(today > end){
          return {status: "Finalizada", disabled: true};
        }else{
          return {status: "Em andamento", disabled: false};
        }
      }
    },
  }, {
    instanceMethods:{
      getPollStatus: () => {
        const today = new Date().getTime();
        const start = new Date(this.start).getTime();
        const end = new Date(this.end).getTime();
        if(today < start){
          return {status: "Não iniciada", disabled: true};
        }else if(today > end){
          return {status: "Finalizada", disabled: true};
        }else{
          return {status: "Em andamento", disabled: false};
        }
      }
    },
    sequelize,
    modelName: 'Polls',
  });
  return Polls;
};
'use strict';
//const Proyectos = require('./project');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    project_id: DataTypes.INTEGER,
    estado: {
      type: DataTypes.INTEGER(1)
    }
  }, {});
  //Task.belongsTo(Proyectos);
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
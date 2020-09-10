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
      type: DataTypes.CHAR(1),
      validate: {
        isIn: [['C', 'I']],
        msg: 'Solo C o I'
      }
    }
  }, {});
  //Task.belongsTo(Proyectos);
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};
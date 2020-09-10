const { QueryTypes } = require('sequelize');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});

  Project.List = function (user_id){ 
    return Project.findAll({
        where: {user_id}//req.session.User.userId}
      })
  }
  
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};
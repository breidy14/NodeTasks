const { QueryTypes } = require("sequelize");
const slug = require("slug");
const shortid = require("shortid");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(100)
      }
    },
    {
      hooks: {
        beforeCreate(proyect) {
          const url = slug(proyect.name).toLowerCase();
          proyect.url = `${url}-${shortid.generate()}`;
        },
      },
    }
  );

  Project.List = function (user_id) {
    return Project.findAll({
      where: { user_id }, //req.session.User.userId}
    });
  };

  Project.associate = function (models) {
    // associations can be defined here
  };
  return Project;
};

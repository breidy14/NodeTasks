'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'Projects',
          key: 'id',
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }
      },
      estado: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: 'I'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};
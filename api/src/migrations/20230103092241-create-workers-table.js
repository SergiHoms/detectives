'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable('workers', { 
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          surname: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            unique: true,
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          active: {
            allowNull: false,
            type: Sequelize.BOOLEAN
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          deletedAt: {
            type: Sequelize.DATE
          }
         });
     
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.dropTable('workers');
     
  }
};

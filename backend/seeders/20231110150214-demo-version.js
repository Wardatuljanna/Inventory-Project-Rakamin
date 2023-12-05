'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('versions', [
      {
        nameVersion: 'Playstation 1',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        nameVersion: 'Playstation 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        nameVersion: 'Playstation 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        nameVersion: 'Playstation 4',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        nameVersion: 'Playstation 5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('versions', null, {});
  }
};
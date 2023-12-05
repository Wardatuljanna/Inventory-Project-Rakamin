'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('logs', [
      {
        qty: 1000,
        createdAt: new Date()
      }, {
        qty: 2000,
        createdAt: new Date()
      }, {
        qty: 3000,
        createdAt: new Date()
      }, {
        qty: 4000,
        createdAt: new Date()
      }, {
        qty: 5000,
        createdAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('logs', null, {});
  }
};

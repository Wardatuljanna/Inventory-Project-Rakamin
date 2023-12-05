'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        productName: 'Dragon Ball',
        versionId: 4,
        qty: 50,
        keterangan: "Uncheck",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        productName: 'Jackie Chan Stuntmaster',
        versionId: 2,
        qty: 10,
        keterangan: "Uncheck",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        productName: 'Crash Bandicot',
        versionId: 1,
        qty: 10,
        keterangan: "Check",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        productName: 'CTR Crash Team Racing',
        versionId: 1,
        qty: 10,
        keterangan: "Check",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        productName: 'Digimon World 3',
        versionId: 1,
        qty: 10,
        keterangan: "Check",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        productName: 'WWF Smackdown 2',
        versionId: 1,
        qty: 10,
        keterangan: "Check",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};

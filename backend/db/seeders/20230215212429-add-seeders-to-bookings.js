'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


const bookingData = [
  {
    spotId: 1,
    userId: 1,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-03-05'),
  },
  {
    spotId: 2,
    userId: 2,
    startDate: new Date('2023-04-01'),
    endDate: new Date('2023-04-07'),
  },
  {
    spotId: 3,
    userId: 3,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-06-05'),
  },
  {
    spotId: 4,
    userId: 4,
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-07'),
  },
  {
    spotId: 5,
    userId: 5,
    startDate: new Date('2023-08-01'),
    endDate: new Date('2023-08-07'),
  },
];


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, bookingData)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, bookingData)
  }
};

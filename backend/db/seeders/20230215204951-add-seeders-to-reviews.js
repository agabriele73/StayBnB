'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    userId: 1,
    spotId: 4,
    review: "I had an amazing time at this Airbnb",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 2,
    review: "This was a great stay! The location was perfect for exploring the city.",
    stars: 4,
  },
  {
    userId: 4,
    spotId: 5,
    review: "Unfortunately, my stay at this Airbnb was a bit disappointing.",
    stars: 2,
  },
  {
    userId: 3,
    spotId: 4,
    review: "I enjoyed my stay at this Airbnb! The location was quiet and peaceful.",
    stars: 3,
  },
  {
    userId: 1,
    spotId: 3,
    review: "I absolutely loved this Airbnb!",
    stars: 5,
  }
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
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, reviews)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, reviews)
  }
};

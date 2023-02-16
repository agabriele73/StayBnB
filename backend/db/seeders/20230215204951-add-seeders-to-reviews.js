'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    id: 1,
    id: 4,
    review: "I had an amazing time at this Airbnb",
    stars: 5,
  },
  {
    id: 2,
    id: 2,
    review: "This was a great stay! The location was perfect for exploring the city.",
    stars: 4,
  },
  {
    id: 4,
    id: 5,
    review: "Unfortunately, my stay at this Airbnb was a bit disappointing.",
    stars: 2,
  },
  {
    id: 3,
    id: 4,
    review: "I enjoyed my stay at this Airbnb! The location was quiet and peaceful.",
    stars: 3,
  },
  {
    id: 1,
    id: 3,
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

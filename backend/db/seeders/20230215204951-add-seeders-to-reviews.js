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
    review: "I had an amazing time at this Airbnb! The hosts were incredibly friendly and helpful, and the space was clean, cozy, and had everything I needed. Would definitely recommend this spot!",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 2,
    review: "This was a great stay! The location was perfect for exploring the city, and the apartment itself was stylish and comfortable. The only downside was that the wifi was a bit spotty, but overall I had a fantastic experience and would stay here again.",
    stars: 4,
  },
  {
    userId: 4,
    spotId: 5,
    review: "Unfortunately, my stay at this Airbnb was a bit disappointing. The place was not as clean as I had hoped, and some of the amenities were not working properly. However, the host was very responsive and tried their best to make things right, so I appreciate their effort. I would recommend this spot with some caveats.",
    stars: 2,
  },
  {
    userId: 3,
    spotId: 4,
    review: "I enjoyed my stay at this Airbnb! The location was quiet and peaceful, and the apartment had everything I needed. The only downside was that the bed was a bit uncomfortable, but I still had a good experience overall.",
    stars: 3,
  },
  {
    userId: 1,
    spotId: 3,
    review: "I absolutely loved this Airbnb! The hosts were so welcoming and made me feel right at home. The space was beautifully decorated and had all the amenities I needed, plus some lovely personal touches. I would highly recommend this spot to anyone looking for a cozy and memorable stay.",
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

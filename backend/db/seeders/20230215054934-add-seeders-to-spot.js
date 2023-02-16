'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const locations = [
  {
    ownerId: 2,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "App Academy",
    description: "Place where web developers are created",
    price: 123
  },
  {
    ownerId: 1,
    address: "456 Main Street",
    city: "New York",
    state: "New York",
    country: "United States of America",
    lat: 40.7127753,
    lng: -74.0059728,
    name: "Empire State Building",
    description: "Iconic skyscraper in Manhattan",
    price: 200
  },
  {
    address: "1 Old Park Lane",
    city: "Camden",
    state: "London",
    country: "United Kingdom",
    lat: 51.504847,
    lng: -0.150628,
    name: "Dorchester Hotel",
    description: "Luxury hotel in Mayfair",
    price: 500
  },
  {
    ownerId: 2,
    address: "20 Rue du Cherche-Midi",
    city: "Paris",
    state: "",
    country: "France",
    lat: 48.8485402,
    lng: 2.3200663,
    name: "Le Bon Marché",
    description: "Luxury department store",
    price: 400
  },
  {
    address: "333 Universal Hollywood Drive",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 34.1374595,
    lng: -118.3565306,
    name: "Universal Studios Hollywood",
    description: "Movie-themed amusement park",
    price: 150
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
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, locations)

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, locations)
  }
};

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
    description: "Relax in our charming cottage nestled in the woods. Perfect for nature lovers. Serene setting with modern amenities. Book now for an unforgettable getaway!",
    price: 123.00
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
    description: "Stay at the iconic Empire State Building in Manhattan. Enjoy breathtaking views, prime location, and luxury amenities. Book your NYC experience now!",
    price: 220.45
  },
  {
    ownerId: 3,
    address: "1 Old Park Lane",
    city: "Camden",
    state: "London",
    country: "United Kingdom",
    lat: 51.504847,
    lng: -0.150628,
    name: "Dorchester Hotel",
    description: "Indulge in luxury at the renowned Dorchester Hotel in Mayfair, London. Elegant rooms, impeccable service, and world-class amenities. Book your upscale stay now!",
    price: 545.45
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
    description: "Experience Parisian elegance at Le Bon Marché, a luxury department store. Chic shopping, gourmet dining, and the epitome of French style. Book your Paris getaway now!",
    price: 410.25
  },
  {
    ownerId: 4,
    address: "333 Universal Hollywood Drive",
    city: "Los Angeles",
    state: "California",
    country: "United States of America",
    lat: 34.1374595,
    lng: -118.3565306,
    name: "Universal Studios Hollywood",
    description: "Immerse yourself in the magic of Universal Studios Hollywood. Thrilling rides, movie-themed attractions, and unforgettable entertainment. Book your Hollywood adventure now!",
    price: 150.35
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

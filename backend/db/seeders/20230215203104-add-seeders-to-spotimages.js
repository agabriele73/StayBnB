'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



const previewImages = 
[
  {
    spotId: 1,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: true
  },
  {
    spotId: 1,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 1,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 1,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 1,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 2,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: true
  },
  {
    spotId: 2,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },  
  {
    spotId: 2,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },  
  {
    spotId: 2,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },  
  {
    spotId: 2,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 3,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: true
  },
  {
    spotId: 3,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 3,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 3,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 3,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
 {
    spotId: 4,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: true
  },
  {
    spotId: 4,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 4,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 4,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 4,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 5,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: true
  },
  {
    spotId: 5,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 5,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 5,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  },
  {
    spotId: 5,
    url: "https://source.unsplash.com/random/?House/",
    previewImg: false
  }
]

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
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, previewImages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, previewImages)
  }
};

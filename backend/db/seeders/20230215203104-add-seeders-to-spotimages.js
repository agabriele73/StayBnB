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
    url: "https://pixabay.com/get/gd618cfa1e947d46b7bcd30ec49224b6030ddd424e4a70aa296bde10bd56f7252bb0a3a675b2582e687ab5450a86e6d9f64a11d854e88b4618018eaa80e13c390_640.jpg",
    previewImg: true
  },
  {
    spotId: 2,
    url: "https://pixabay.com/get/gb3d0180fee4479b648bb93638e747924062f8b6d9b359f13abd41212f14110b2e1b1e27ccf16ca8cef3aadfefb363c8cd241ec4fffa27696677bfd2d5e24d69c_640.jpg",
    previewImg: true
  },
  {
    spotId: 3,
    url: "https://pixabay.com/get/g12b1eff9fc19368476501060fce6635ee046454264df3789b5678ab5de4e3360f6696eaef07df1bbdf92193b78082162_640.jpg",
    previewImg: true
  },
  {
    "id": 4,
    "url": "https://pixabay.com/get/g91b7eea60d38802c77990980909bf9c74161c1a6175d1c05394c4619ba1e11920cfa18eae972cd2383ebb10f66509c35_640.jpg",
    "preview": true
  },
  {
    spotId: 5,
    url: "https://pixabay.com/get/g1a66765bf43dbf2193853796b3f5d817ce3c75bc315265eae7dba1d1447b2b4c9a9f7b52f91591357f355a480eade1fc2749bb818b370b159165ed9b5a721792_640.jpg",
    previewImg: true
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
    options.tableName = 'spotImages'
    await queryInterface.bulkInsert(options, previewImages)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'spotImages'
    await queryInterface.bulkDelete(options, previewImages)
  }
};

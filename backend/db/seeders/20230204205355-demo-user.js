'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const people = 
[
  {
    firstName: 'Demo',
    lastName: 'User',
    username: 'demouser',
    email: 'demo@user.io',
    hashedPassword: bcrypt.hashSync('password')
}, 

  {
    firstName: 'Alfonso',
    lastName: 'Gabriel',
    username: 'sadcheeto',
    email: 'sadcheetto@gmail.com',
    hashedPassword: bcrypt.hashSync('aJnpREtvGKiuLwOcQMbylzmXFqDShgNaeBfjxHrUsT')
}, 
{
  firstName: "Xander",
  lastName: "Jorgensen",
  email: "xanderjorgensen@gmail.com",
  username: "xanderjo5",
  hashedPassword: bcrypt.hashSync("rTUcKtsbQfPjevqmFVkiZWLOXpMlDdEyaxSYHNhGzw")
},
{
  firstName: "Lila",
  lastName: "Chang",
  email: "lilachang@gmail.com",
  username: "lilach2",
  hashedPassword: bcrypt.hashSync("oRDsEKBnkbLajcpxuyYJmzXqvfTQlNPtZgwGWIeMAH")
},
{
  firstName: "Mateo",
  lastName: "Kumar",
  email: "mateokumar@gmail.com",
  username: "matkuma",
  hashedPassword: bcrypt.hashSync("ZGMrhJwNvIuWfQDgXcCsEiBtOyYPpSTanxkqUeFbL")
},
{
  firstName: "Ayaan",
  lastName: "Nguyen",
  email: "ayaannguyen@gmail.com",
  username: "ayaaaaa",
  hashedPassword: bcrypt.hashSync("tZPxpivWfjrwEaeRmyMnckLSsJYUubgHlXKqBoDNhC")
}

]


/** @type {import('sequelize-cli').Migration} */
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
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, people)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, people)
  }
};

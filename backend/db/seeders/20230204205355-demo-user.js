'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const people = 
[
  {
    firstName: 'Alfonso',
    lastName: 'Gabriel',
    username: 'sadcheeto',
    email: 'sadcheetto@gmail.com',
    hashedPassword: bcrypt.hashSync('ilikecheetos')
}, 
{
  firstName: "Xander",
  lastName: "Jorgensen",
  email: "xander.jorgensen@example.com",
  username: "xanderjorgensen",
  hashedPassword: bcrypt.hashSync("sR6D9d?zL@J8aTc")
},
{
  firstName: "Lila",
  lastName: "Chang",
  email: "lila.chang@example.com",
  username: "lilachang",
  hashedPassword: bcrypt.hashSync("5xKu@7z!hDmL8Nt")
},
{
  firstName: "Mateo",
  lastName: "Kumar",
  email: "mateo.kumar@example.com",
  username: "mateokumar",
  hashedPassword: bcrypt.hashSync("pL#3bF9qXrM2sCz")
},
{
  firstName: "Ayaan",
  lastName: "Nguyen",
  email: "ayaan.nguyen@example.com",
  username: "ayaannguyen",
  hashedPassword: bcrypt.hashSync("yJ6@zL9cXmG8sBn")
},
{
  firstName: "Natalia",
  lastName: "Garcia",
  email: "natalia.garcia@example.com",
  username: "nataliagarcia",
  hashedPassword: bcrypt.hashSync("tB9mC7yJ5!zQ8kD")
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

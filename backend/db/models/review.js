'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {foreignKey: 'id'})
      Review.belongsTo(models.Spot, {foreignKey: 'id'})
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId'})
    }
  }
  Review.init({
    userId: { 
      type: DataTypes.INTEGER
    },
    spotId:{ 
      type: DataTypes.INTEGER
    },
    review: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Review text is required'
        }
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 1,
        max: 5,
        msg: 'Stars must be an integer from 1 to 5'
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
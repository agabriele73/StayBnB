'use strict';



const {
  Model
} = require('sequelize');
const { sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId'})
      Spot.hasMany(models.Review, {as: 'avgRating', foreignKey: 'spotId' })
      Spot.hasMany(models.SpotImage, {as: 'previewImage', foreignKey: 'spotId'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
      
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Street address is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: { 
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Latitude is not valid'
        }
      }
    },
    lng: { 
      type:DataTypes.DECIMAL,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Longitude is not valid'
        }
      }
    },
    name: { 
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,50],
          msg: 'Name must be less than 50 characters'
        }
      }
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    price:{ 
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price per day is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      spotWithPreview: {
        include: [
          {
            association: 'previewImage', where: {previewImg: true}, attributes: [`url`]
          },
          {
            association: 'avgRating', attributes: ['stars']
          }
        ]
      }
    }
  });
  return Spot;
};
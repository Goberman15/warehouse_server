'use strict';

const { hashPassword } = require('../helpers/bcrypt.js');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exists'
      },
      validate: {
        notEmpty: {
          msg: "username can\'t be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password can\'t be empty"
        },
        len: {
          args: [8],
          msg: 'password must be at least 8 character long'
        },
        is: {
          args: /^\S+\S$/gi,
          msg: 'password can\'t contain any whitespace character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};
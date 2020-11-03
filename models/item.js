'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Cart);
    }
  };
  Item.init({
    type: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Cargo Type can\'t be empty'
      },
      validate: {
        notEmpty: {
          msg: 'Cargo Type can\'t be empty'
        }
      }
    },
    warehouse_type: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Warehouse Type can\'t be empty'
      },
      validate: {
        notEmpty: {
          msg: 'Warehouse Type can\'t be empty'
        }
      }
    },
    storage_location: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Storage Location can\'t be empty'
      },
      validate: {
        notEmpty: {
          msg: 'Storage Location can\'t be empty'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Item Quantity can\'t be empty'
      },
      validate: {
        notEmpty: {
          msg: 'Item Quantity can\'t be empty'
        },
        isInt: {
          msg: 'Item Quantity must be a number'
        },
        isGreaterThanZero (val) {
          if (val <= 0) {
            throw('Item Quantity must be greater than zero');
          }
        }
      }
    },
    total_area: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'All required dimension field must be a number'
        },
        isGreaterThanZero(val) {
          if (val <= 0) {
            throw('All required dimension field must be greater than 0');
          }
        }
      }
    },
    volume: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'All required dimension field must be a number'
        },
        isGreaterThanZero(val) {
          if (val <= 0) {
            throw('All required dimension field must be greater than 0');
          }
        }
      }
    },
    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Item Weight can\'t be empty'
        },
        isInt: {
          msg: 'Item Weight must be a number'
        },
        isGreaterThanZero (val) {
          if (val <= 0) {
            throw('Item Weight must be greater than zero');
          }
        }
      }
    },
    stack_per_bin: {
      type: DataTypes.INTEGER
    },
    total_pallet: {
      type: DataTypes.INTEGER
    },
    diameter: {
      type: DataTypes.DECIMAL
    },
    volume_quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    size_dimension: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handling: {
      type: DataTypes.STRING,
      allowNull: false
    },
    consumption_storage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    added_cost: {
      type: DataTypes.DECIMAL
    },
    total_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    added_services: {
      type: DataTypes.STRING
    },
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Carts',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
      hooks: true
    }
  }, {
    sequelize,
    modelName: 'Item',
    hooks: {
      beforeCreate(item) {
        const { models } = sequelize;

        return models.Cart.findOne({
          where: {
            id: item.CartId
          }
        })
        .then(cart => {

          let total_items = cart.total_items;
          let total_price = +cart.total_price;
          total_items++;
          total_price += item.cost;

          return models.Cart.update({
            total_items,
            total_price
          }, {
            where: {
              id: item.CartId
            }
          })
        })
        .catch(err => {
          throw(err);
        })
      },
      beforeBulkDestroy(options) {
        options.individualHooks = true;
      },
      beforeDestroy(item) {
        const { models} = sequelize;

        return models.Cart.findOne({
          where: {
            id: item.CartId
          }
        })
        .then(cart => {

          let total_items = cart.total_items;
          let total_price = +cart.total_price;
          total_items--;
          total_price -= item.cost;

          return models.Cart.update({
            total_items,
            total_price
          }, {
            where: {
              id: item.CartId
            }
          })
        })
        .catch(err => {
          throw(err);
        })
      }

    }
  });
  return Item;
};
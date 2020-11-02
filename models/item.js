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
    type: DataTypes.STRING,
    warehouse_type: DataTypes.STRING,
    storage_location: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    totalArea: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL,
    weight: DataTypes.DECIMAL,
    stack_per_bin: DataTypes.INTEGER,
    total_pallet: DataTypes.INTEGER,
    diameter: DataTypes.DECIMAL,
    volume_quantity: DataTypes.DECIMAL,
    size_dimension: DataTypes.STRING,
    handling: DataTypes.STRING,
    consumption_storage: DataTypes.DECIMAL,
    location: DataTypes.STRING,
    level: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    added_cost: DataTypes.DECIMAL,
    total_cost: DataTypes.DECIMAL,
    added_services: DataTypes.STRING,
    CartId: DataTypes.INTEGER
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
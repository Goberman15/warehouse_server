'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      warehouse_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      storage_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_area: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      volume: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      weight: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      stack_per_bin: {
        type: Sequelize.INTEGER
      },
      total_pallet: {
        type: Sequelize.INTEGER
      },
      diameter: {
        type: Sequelize.DECIMAL
      },
      volume_quantity: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      size_dimension: {
        type: Sequelize.STRING,
        allowNull: false
      },
      handling: {
        type: Sequelize.STRING,
        allowNull: false
      },
      consumption_storage: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      added_cost: {
        type: Sequelize.DECIMAL
      },
      total_cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      added_services: {
        type: Sequelize.STRING
      },
      CartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        hooks: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};
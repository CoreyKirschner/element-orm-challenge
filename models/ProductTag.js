const { Model, DataTypes } = require('sequelize');
const Product = require('./Product');
const Tag = require('./Tag');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

// define associations
ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});
ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = ProductTag;

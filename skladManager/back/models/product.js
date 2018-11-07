'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    count: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});

  Product.associate = function(models) {
    Product.belongsTo(models.Section);
    Product.belongsTo(models.Category);
  };
  return Product;
};
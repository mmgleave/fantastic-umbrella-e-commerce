// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // id: INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL
    // product_name: STRING NOT NULL
    // price: DECIMAL NOT NULL
      // validate as decimal
    // stock: INTEGER NOT NULL
      // default 10
      // validates value is numeric
    // category_id: INTEGER 
      // referenced the category model's id
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

// Association: Product belongs to Category, as a category can have multiple products but a product can only belong to one category
// Association: Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products
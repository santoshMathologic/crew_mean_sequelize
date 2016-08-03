var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../database/db.js');
//var validateUser = require('../routes/auth/auth').validateUser;

var Item = sequelize.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
});
module.exports = Item;
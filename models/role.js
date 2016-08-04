var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../database/db.js');

var Role = sequelize.define('Role', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    privilegeCode: Sequelize.STRING,
    roleDescription: Sequelize.STRING,
    roleCode: Sequelize.STRING, 
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
module.exports = Role
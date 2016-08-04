var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../database/db.js');

var User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    userName: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    roleCode: Sequelize.STRING,
    markDelete : Sequelize.BOOLEAN,
    mobileNumber : Sequelize.BIGINT(14),
    address : Sequelize.STRING,
    city : Sequelize.STRING,
    subscribeStations : Sequelize.STRING,
    userActive : Sequelize.BOOLEAN,
    
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});
module.exports = User
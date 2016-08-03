var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var Item = Sequelize.define('Item', {
    id: Sequelize.STRING,
    name:Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER
});

Sequelize.sync({ force: true }).complete(function (err) {
    if (err) {
        console.log('An error occur while creating table');
    } else {
        console.log('Item table created successfully');
    }
});

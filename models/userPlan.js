var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../database/db.js');


var UserPlan = sequelize.define('UserPlan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    planName: {type: Sequelize.STRING},
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{tableName:"userplans"});

sequelize.sync({force:true})
module.exports = UserPlan
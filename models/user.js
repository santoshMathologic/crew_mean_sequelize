var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = require('../database/db.js');
var Role = require('../models/role.js');

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
    markDelete: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    mobileNumber: Sequelize.BIGINT(14),
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    subscribeStations: Sequelize.STRING,
    userActive: Sequelize.BOOLEAN,
    idRole : {type: Sequelize.INTEGER,refrences:'roles',refrencesKey:'id'},

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{tableName:'users'});

//User.hasOne(Role, { foreignKey: 'fk_id'});
//Role.belongsTo(User, { foreignKey: 'fk_id' })
//User.hasOne(Role, { foreignKey: 'idClient' , foreignKeyConstraint:true })

Role.belongsTo(User, { foreignKey: 'idRole',as:'User' })
User.hasMany(Role, { foreignKey: 'idRole',as:'Role' })

module.exports = User
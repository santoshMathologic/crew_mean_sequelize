var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var sequelize = new Sequelize({
            username: "crewlink_db",
            password: "crewlink_db",
            database: "crewlink_db_sequelize",
            host: "127.0.0.1" || "localhost",
            port: 3306,
            dialect: 'mysql',

        });
        sequelize.authenticate().then(function (errors) {
            if (errors) {
                console.log(errors)
                throw new Error("Error DataBase connection to Mysql");

            }
            else {
                console.log("DataBase connection to Mysql Successfully")
            }

        });
module.exports = sequelize;




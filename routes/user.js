var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var sequelize = require('../database/db.js');
var q = require('q');

var userObj = {
    getUsers: function (req, res) {
        sequelize.query('SELECT * FROM users').then(function (result) {
            console.log(result);
        }).error(function (err) {
            console.log(err);
        });
    },


    user_findOne: function (req, res) {
        user.findOne().then(function (item) {
            console.log(item.get('name'));
            return res.json(item.get('name'));
        });
    },

    user_find: function (req, res) {
        user.find({ where: { firstname: 'santosh' } }).then(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                return res.json(user);
            }

        });
    },

    createUser: function (req, res) {
        user.sync().then(function (error) {
            var usrObj = user.build({
                userName: "santosh.citech",
                firstName: "santosh",
                lastName: "sahu",
                password: "123456",
                email: "santosh.citech@gmail.com",
                roleCode: "admin",
                markDelete: true,
                mobileNumber: 123456,
                address: "Bangalore",
                city: "Bangalore",
                subscribeStations: "SBC",
                userActive: true,


            }).save()
                .then(function (response) {
                    console.log('success');
                    res.status(201);
                    res.json({
                        "status": 200,
                        "message": "User Created Successfully"
                    })
                })
                .error(function (err) {
                    if (err) throw err;
                });

        });
    },


    saveUsingCreate: function (req, res) {

        var usrObj = {
            userName: "santosh.citech",
            firstName: "",
            lastName: "",
            password: "Sequelize.STRING",
            email: "Sequelize.STRING",
            roleCode: "Sequelize.STRING",
            markDelete: true,
            mobileNumber: 123456,
            address: "Sequelize.STRING",
            city: "Sequelize.STRING",
            subscribeStations: "Sequelize.STRING",
            userActive: true,


        };

        user.create(usrObj)
            .then(function (savedRespose) {
                console.log(savedRespose.get('userName')); // John Doe (SENIOR ENGINEER)

                res.status(201);
                res.json({
                    "status": 200,
                    "message": "Items Created Successfully"
                })
            })

    },

    deleteItems: function (req, res) {

    },




}

module.exports = userObj;

var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var sequelize = require('../database/db.js');
var q = require('q');

var userObj = {
    getUsers: function (req, res) {
        sequelize.query('SELECT * FROM users').then(function (result) {
            console.log(result);
            return res.json(result);
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

    deleteUser: function (req, res) {
        var paramid = req.query.id;
        user.destroy({
            where: {
                id: paramid //this will be your id that you want to delete
            }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
                res.status(201);
              return res.json({
                    "status": 200,
                    "message": "user deleted Successfully"
                })
            }
        }, function (err) {
            console.log(err);
        });

        /* user.findAndDelete(id, function (error, result) {
             if (error) throw error
             else {
                 return res.json(result);
             }
         });
         */

    },




}

module.exports = userObj;

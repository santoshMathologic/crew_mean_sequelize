var express = require('express');
var router = express.Router();
var user = require('../models/user.js');
var sequelize = require('../database/db.js');
var q = require('q');

var userObj = {
    getUsers: function (req, res) {

        var options = {
            limit: parseInt(req.query.limit) || 10,
            offset: parseInt(req.query.offset) || 0,
            orderBy: req.query.orderBy,
            tableName: req.query.tableName,
            orderByVerb: req.query.orderByVerb

        }

        var Query = "SELECT * FROM " + options.tableName + " ORDER BY " + options.orderBy + " " +options.orderByVerb+ " LIMIT " + options.limit

        sequelize.query(Query, { type: sequelize.QueryTypes.SELECT }).then(function (result) {
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

    user_findAll: function (req, res) {
        var limit = req.params.limit || 10
        var offset = req.params.offset || 0

        user.find({
            limit: limit,
            offset: offset,
        }).then(function (users, error) {
            if (error) {
                console.log(error);
            } else {
                return res.json(users);
            }

        });
    },

    createUser: function (req, res) {
        user.sync().then(function (error) {
            var usrObj = user.build({
                userName: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                email: req.body.email,
                roleCode: req.body.role.roleCode,
                markDelete: false,
                mobileNumber: req.body.mobileNo,
                address: req.body.address,
                city: "Bengaluru",
                subscribeStations: "MAS",
                userActive: req.body.isActive,




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

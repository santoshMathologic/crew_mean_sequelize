var express = require('express');
var router = express.Router();
var role = require('../models/role.js');
var sequelize = require('../database/db.js');
var q = require('q');

var userObj = {
    getRoles: function (req, res) {
        sequelize.query('SELECT * FROM roles').then(function (result) {
            console.log(result);
            return res.json(result);
        }).error(function (err) {
            console.log(err);
        });
    },


    role_findOne: function (req, res) {
        role.findOne().then(function (roleResponse) {
            console.log(roleResponse.get('roleCode'));
            return res.json(roleResponse.get('roleCode'));
        });
    },

    role_find: function (req, res) {
        var limit = req.params.limit || 10
        var offset = req.params.offset ||0
        

        role.findAll({
            limit: limit,
            offset: offset,
        }).then(function (user, error) {
            if (error) throw error;
            else {
                return res.json(user);
            }
        });
    },

    createRole: function (req, res) {
        role.sync().then(function (error) {
            var roleObj = role.build({
                privilegeCode: "Others",
                roleDescription: "This is Others roles",
                roleCode: "admin",

            }).save()
                .then(function (response) {
                    console.log('success');
                    res.status(201);
                    res.json({
                        "status": 200,
                        "message": "Role Created Successfully"
                    })
                })
                .error(function (err) {
                    if (err) throw err;
                });

        });
    },


    saveUsingCreate: function (req, res) {

        var roleObj = {
            privilegeCode: "Others",
            roleDescription: "This is Others roles",
            roleCode: "admin",
        };
        role.create(roleObj)
            .then(function (savedRespose) {
                console.log(savedRespose.get('roleCode'));

                res.status(201);
                res.json({
                    "status": 200,
                    "message": "Role Created Successfully"
                })
            })

    },

    deleteRole: function (req, res) {
        var paramid = req.query.id;
        role.destroy({
            where: {
                id: paramid
            }
        }).then(function (rowDeleted) {
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
                res.status(201);
                return res.json({
                    "status": 200,
                    "message": "role deleted Successfully"
                })
            }
        }, function (err) {
            console.log(err);
        });

    },




}

module.exports = userObj;

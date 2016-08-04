var express = require('express');
var router = express.Router();
var plan = require('../models/userPlan.js');
var sequelize = require('../database/db.js');
var q = require('q');

var userPlan = {
    getAllPlan: function (req, res) {
        sequelize.query('SELECT * FROM userplans').then(function (error) {
            return res.json(result);
        }).error(function (error) {
            console.log(error);
        });
    },



    createPlan: function (req, res) {
        var planObject = {
            id:req.body.id,
            planName: req.body.planName,
        };
        plan.create(planObject)
            .then(function (savedRespose) {
                res.status(201);
                res.json({
                    "status": 200,
                    "message": "Plan Created Successfully"
                })
            })

    },






}

module.exports = userPlan;

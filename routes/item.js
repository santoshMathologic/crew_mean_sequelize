var express = require('express');
var router = express.Router();
var Item = require('../models/item.js');
var q = require('q');

var itemsObj = {
  getItems: function (req, res) {
    Item.findAll().then(function (items) {
      return res.json(items);

    })
  },


  Item_findOne: function (req, res) {
    Item.findOne().then(function (item) {
      console.log(item.get('name'));
      return res.json(item.get('name'));
    });
  },

  Item_find: function (req, res) {
    Item.find({ where: { name:'Laptop'}}).then(function (err, item) {
      if (err) {
        console.log(err);
      } else {
        return res.json(item.dataValues);
      }

    });
  },

  createItems: function (req, res) {
    Item.sync().then(function (error) {
      var itemObj = Item.build({
        name: 'Laptop',
        description: 'Acer 2340TL',
        qty: 23
      }).save()
        .then(function (response) {
          console.log('success');
          res.status(201);
          res.json({
            "status": 200,
            "message": "Items Created Successfully"
          })
        })
        .error(function (err) {
          if (err) throw err;
        });

    });
  },


  deleteItems: function (req, res) {

  },




}

module.exports = itemsObj;

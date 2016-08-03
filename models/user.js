var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');

var User = Sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});
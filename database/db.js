
var Sequelize = require('sequelize');
var sequelize = new Sequelize('crewlink_db_sequelize', 'crewlink_db', 'crewlink_db', {
    host: "localhost",
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

var Item = sequelize.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER,
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
});

sequelize.sync({force: false }).then(function (err) {
    if (err) {
        console.log('An error occur while creating table');
    } else {
        console.log('Item table created successfully');
    }
});

Item.sync().then(function (error) {
    var itemObj = Item.build({
        name: 'Laptop',
        description: 'Acer 2340TL',
        qty: 23
    }).save()
        .then(function () {
            console.log('success');
        })
        .error(function (err) {
            if (err) throw err;
        });

});


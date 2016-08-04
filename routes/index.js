var express = require('express');
var router = express.Router();
var itemRoute = require('./item.js');
var userRoute = require('./user.js');
var roleRoute = require('./role.js');




/// Routes for Items 

router.get('/api/v1/items/findOne', itemRoute.Item_findOne);
router.get('/api/v1/items/find', itemRoute.Item_find);
router.get('/api/v1/items', itemRoute.getItems);
router.post('/api/v1/items', itemRoute.createItems);
router.post('/api/v1/items/saveUsingCreate', itemRoute.saveUsingCreate);

/// Routes for User

router.get('/api/v1/users/findOne', userRoute.user_findOne);
router.get('/api/v1/users/find', userRoute.user_find);
router.get('/api/v1/users', userRoute.getUsers);
router.post('/api/v1/users', userRoute.createUser);
router.post('/api/v1/users/saveUsingCreate', userRoute.saveUsingCreate);
router.delete('/api/v1/users', userRoute.deleteUser);



// Routes for Role 
router.get('/api/v1/roles/findOne', roleRoute.role_findOne);
router.get('/api/v1/roles/find', roleRoute.role_find);
router.get('/api/v1/roles', roleRoute.getRoles);
router.post('/api/v1/roles', roleRoute.createRole);
router.post('/api/v1/roles/saveUsingCreate', roleRoute.saveUsingCreate);
router.delete('/api/v1/roles', roleRoute.deleteRole);


module.exports = router;

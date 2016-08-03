var express = require('express');
var router = express.Router();
var itemRoute = require('./item.js');




/// Routes for Items 

router.get('/api/v1/items/findOne', itemRoute.Item_findOne);
router.get('/api/v1/items/find', itemRoute.Item_find);
router.get('/api/v1/items', itemRoute.getItems);
router.post('/api/v1/items', itemRoute.createItems);
router.post('/api/v1/items/saveUsingCreate', itemRoute.saveUsingCreate);




module.exports = router;

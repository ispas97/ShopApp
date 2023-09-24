var express = require('express');
var models = require('../models');
var router = express.Router();

// GET all orders from database.
router.get('/',async function(req, res, next) {
  // models.Order.findAll(req.user.id).then(function(orders) {
  //   var result = orders.map(function(order) {
  //     return models.orderToJSON(order);
  //   });
  //   res.json(result);
  // }).catch(next);
  var orders=await models.Order.findAll(req.user.id)
  res.render("customer/customer",{orders:orders})
});

// POST a new order to the database.
router.post('/', function(req, res, next) {
  // var o = {
  //   id: req.body.id,
  //   subtotal: parseFloat(req.body.subtotal),
  //   customer_id: parseInt(req.body.customer.id)
  // };
  // models.Order.create(o).then(function(order) {
  //   res.json(models.orderToJSON(order));
  // }).catch(next);
});

// GET one order using its id, from the database.
// router.get('/:id1/:id2',async function(req, res, next) {
//   var id = parseInt(req.params.id1);
//   var product = models.Product.findByPk(id)
//   console.log(req.user.id)
//   var o={product_id:product.id,
//   customer_id:req.user.id}
//   var order=await models.Order.create(o)
//   res.render("order/order",{order:order})
// });

module.exports = router;

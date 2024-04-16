var express = require('express');
var models = require('../models');
var router = express.Router();

// GET all customers.
router.get('/', async function(req, res, next) {
  var customers=await models.Customer.findAll()
  res.render('customer/index',{customers:customers})
});
router.post('/', async function(req, res, next) {
   var customers=await models.Customer.findAll()
  console.log(customers);
    res.render('customer/customers',{customers:customers})
});

router.delete('/delete',function(req,res) {
  models.Customer.drop();
  res.send("Customer table dropped");
})


//POST a new customer.

// GET one customer.
router.get('/:id',async function(req, res, next) {
  var id = parseInt(req.params.id);
  var customer =await models.Customer.findById(id)
});

module.exports = router;

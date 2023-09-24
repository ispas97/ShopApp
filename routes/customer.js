var express = require('express');
var models = require('../models');
var router = express.Router();

// GET all customers.
router.get('/', function(req, res, next) {
   var customers=models.Customer.findAll().then(function(customers) {
    var result = customers.map(function(customer) {
      return models.customerToJSON(customer);
    });
  console.log(customers);
    res.render('customer/customer',{results:customers})
  })
    //res.json(result);
    //res.send(result)
  //}).catch(next);

});


router.post('/add', async function(req, res, next) {
  console.log("I was here")
  var c = {name: req.body.ime};
  await models.Customer.create(c);
  var customers=await models.Customer.findAll().then(function(customers) {
    var result = customers.map(function(customer) {
      return models.customerToJSON(customer);
    });
  res.render('customer/customers',{customers:result})
});
//res.render('customer',{results:customers})
});

router.delete('/delete',function(req,res) {
  models.Customer.drop();
  res.send("Customer table dropped");
})


// router.post('/add', function(req,res) {
//   models.Customer.sync({
//       force:false,
  
//   })
//   .then(function(){
//       return models.Customer.bulkCreate([
//           {
//               name:req.body.name,
//           },
//       ])
//   })
//   .catch(function(err) {
//       console.error("error:- ",err.message);
//   });
//   var customers=models.Customer.findAll().then(function(customers) {
//     var result = customers.map(function(customer) {
//       return models.customerToJSON(customer);
//     });
//   console.log(customers);
//     res.render('customer',{results:customers})
//   })

  // var customers=models.Customer.findAll();
  // res.render('customer',{results:customers})
  //res.send("Customer created with Name:- " + req.body.name)
  //})

//POST a new customer.

// GET one customer.
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  models.Customer.findById(id).then(function(customer) {
    res.json(models.customerToJSON(customer));
  }).catch(next);
});

module.exports = router;

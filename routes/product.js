var express = require('express');
var models = require('../models');
var router = express.Router();

// GET all products from database.
router.get('/', async function(req, res, next) {
  // await models.Product.findAll().then(function(products) {
  //   var result = products.map(function(product) {
  //     return models.productToJSON(product);
  //   });
  //   res.render("product/index",{products:result})
  // }).catch(next);
  var products=await models.Product.findAll()
  res.render('product/index',{products:products})
});

// POST a new product to the database.
router.post('/', async function(req, res, next) {
  var id = req.body.id || null;
  var p = {
    id: id,
    name: req.body.prodname,
    price: parseFloat(req.body.price)
  };
  await models.Product.create(p)//.then(function(product) {
  var products=await models.Product.findAll()
    res.render('product/index',{products:products})
    //res.json(models.productToJSON(product));
  //}).catch(next);
});

router.get('/new',async function(req,res,next){
  res.render('product/new');
})

// GET one product using its id, from the database.
router.get('/:id',async function(req, res, next) {
  if (req.user==null)
    user="anonimus"
  else user=req.user
   var product=await models.Product.findByPk(req.params.id)
   console.log(product)
    var result = models.productToJSON(product);
    res.render("product/product",{product:result,user:user})
  //}).catch(next);
//    res.json(models.productToJSON(product));
});

router.delete('/delete',function(req,res) {
  models.Product.drop();
  res.send("Product table dropped");
})

module.exports = router;

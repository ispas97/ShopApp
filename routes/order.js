var express = require('express');
var models = require('../models');
var router = express.Router();
const {checkAuthenticated,checkNotAuthenticated}=require ("../authentication")

// GET all orders from database.
router.get('/',checkAuthenticated,async function(req, res, next) {
  var customer=await models.Customer.findByPk(req.user.id)
  var products=await customer.getProducts()
  console.log(products) 
  res.render("order/customer",{products:products,customer:customer})
});

// POST a new order to the database.
router.post('/', function(req, res, next) {
});
router.get('/shoppingCart',async function(req,res){
  var customer=await models.Customer.findByPk(req.user.id)
  console.log("I was here")
  var products=await customer.getProducts()
  console.log(products)
  res.render("order/shoppingCart",{products:products})
})

router.get('/:id', async function(req,res, next) {
 var id = req.params.id
 var customer=await models.Customer.findByPk(id)
 var products=await customer.getProducts()
 res.render("order/customer",{products:products,customer:customer})
})

// GET one order using its id, from the database.
router.post('/shoppingCart',async function(req, res, next) {
  try{
  console.log(req.body.productid)
  var product = await models.Product.findByPk(req.body.productid)
  var customer= await models.Customer.findOne({where:{name:req.user.name,email:req.user.email}})
  await models.Product.update({description:"shopping cart"},{where: {id:product.id}})
  console.log("Hi 1")
  await customer.addProduct(product);
  console.log("Hi 2")
  var products=await customer.getProducts()
  console.log(products)
  res.render("order/shoppingCart",{products:products})
  }catch(err){
    console.log(err)
  }
});
router.get('/:id1/:id2', async function(req,res, next) {
  var customerid = req.params.id2
  var productid = req.params.id1
  var product=await models.Product.findByPk(productid)
  console.log(product)
  var order=await models.Order.findOne({where:{CustomerId:customerid,ProductId:productid}})
  res.render("order/order",{product:product,order:order,customerid:customerid})
})

router.get('/:id1/:id2/return', async function(req,res, next) {
  var customerid = req.params.id2
  var productid = req.params.id1
  await models.Product.update({description:"on sale"},{where:{id:productid}})
  await models.Order.destroy({where:{CustomerId:customerid,ProductId:productid}})
  res.redirect("/product")
})

router.get('/:id1/:id2/replace', async function(req,res, next) {
  var customerid = req.params.id2
  var productid = req.params.id1
  var product=await models.Product.findByPk(productid)
  var customer= await models.Customer.findByPk(customerid)
  var replace_product=await models.Product.findOne({where:{name:product.name,price:product.price,description:"on sale"}})
  if (replace_product!=null)
  {
    await models.Order.destroy({where:{CustomerId:customerid,ProductId:productid}})
    replace_product.description="bought"
    console.log("Been here")
    await replace_product.save()
    console.log(replace_product)
    await models.Product.update({description:"on sale"},{where:{id:productid}})
    await customer.addProduct(replace_product)
  }
  res.redirect("/product")
})

router.delete('/delete',function(req,res) {
  models.Order.drop();
  res.send("Order table dropped");
})


module.exports = router;

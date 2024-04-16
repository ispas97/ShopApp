var express = require('express');
var models = require('../models');
var router = express.Router();
var path = require('path');
const multer=require('multer')
const {checkAuthenticated,checkNotAuthenticated}=require("../authentication")

const imageMimeTypes=['images/jpg','images/png','images/gif']

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
})
const upload = multer({ storage: storage })


// GET all products from database.
router.get('/', async function(req, res, next) {
  var products=await models.Product.findAll()
  console.log(products)
  res.render('product/index',{products:products})
});

// POST a new product to the database.
router.post('/', upload.single('image'), async function(req, res, next) {
  console.log(req.file)
  const filename = req.file != null ? req.file.filename: null
  var p = {
    name: req.body.prodname,
    price: parseFloat(req.body.price),
    picture: filename
  };
  // const { image } = req.files;

  //   // If no image submitted, exit
  //   if (!image) return res.sendStatus(400);

  //   // Move the uploaded image to our upload folder
  // image.mv(__dirname + '/upload/' + image.name);
  try{
    console.log("Been here")
    await models.Product.create(p)
    var products=await models.Product.findAll()
    res.render('product/index',{products:products})
  } catch {
      res.send("An error happened")
  }


});

router.get('/new',async function(req,res,next){
  res.render('product/new');
})

// GET one product using its id, from the database.
router.get('/:id',checkAuthenticated,async function(req, res, next) {
   var product=await models.Product.findByPk(req.params.id)
   console.log(product)
   res.render("product/product",{product:product})
});

router.post('/:id',checkAuthenticated,async function(req, res, next) {
  var product=await models.Product.findByPk(req.params.id)
  await models.Order.destroy({where:{ProductId:product.id}})
  await models.Product.update({description:"bought"},{where:{id:product.id}})
  product = await models.Product.findByPk(product.id)
  var customer = await models.Customer.findByPk(req.user.id)
  await customer.addProduct(product)
  res.redirect("/product")
});
router.post('/:id/delete',async function(req,res,next) {
  await models.Order.destroy({where:{CustomerId:req.user.id,ProductId:req.params.id}})
  res.redirect('/product')
})

router.delete('/delete',function(req,res) {
  models.Product.drop();
  res.send("Product table dropped");
})

module.exports = router;

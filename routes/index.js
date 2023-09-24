var express = require('express');
var models = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user==null)
    user="anonimus"
  else user=req.user
  res.render('index/index',{user:user});
});

router.get('/ping', function(req, res, next) {
  res.type("text/plain");
  res.send('node/sequelize');
});
router.get('/register', function(req,res,next) {
  res.render('index/register')
})
router.post('/register',async function(req,res,next) {
  var c={ name:req.body.name,
    email:req.body.email,
    password:req.body.password
  }
  await models.Customer.create(c)
  res.render("index/login")

})
router.get('/login',function(req,res){
  res.render('index/login')
})
router.post('/login',async function(req,res){
  var c={email:req.body.email,
  password:req.body.password}
  var customer=await models.Customer.findOne({where:{password:req.body.password}})
  res.redirect('/')
  })
module.exports = router;

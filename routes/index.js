var express = require('express');
var models = require('../models');
var router = express.Router();
const bcrypt=require('bcrypt');
const passport = require('passport');
const {checkAuthenticated,checkNotAuthenticated}=require ("../authentication")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index');
});

router.get('/register',checkNotAuthenticated ,function(req,res,next) {
  res.render('index/register')
})
router.post('/register',checkNotAuthenticated ,async function(req,res,next) {
  try{
    const hashedPassword=await bcrypt.hash(req.body.password,10)
  
    var c={ name:req.body.name,
    email:req.body.email,
    password:hashedPassword
  }
  await models.Customer.create(c)
  res.redirect("/login")
}
catch(err){
  console.log(err)
  res.redirect('/register')
}

})
router.get('/login', checkNotAuthenticated ,function(req,res){
  res.render('index/login')
})
router.post('/login',
  passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)
router.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
module.exports = router;

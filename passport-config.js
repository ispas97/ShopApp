const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

var models = require('./models')

module.exports =function(passport) {
    passport.use(
        new LocalStrategy({usernameField:'email',passwordField:'password'},(email,password,done) => {
            console.log("Log 1")
            models.Customer.findOne({where:{ email: email}})
            .then(user => {
                if(!user) {
                    return done(null,false,{message:'That email is not registered'})
                }
                console.log("Log 2")
                bcrypt.compare(password,user.password, (err,isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        console.log("Log 3")
                        return done(null,user);
                    } else {
                        return done(null,false, {message: 'Password incorrect'})
                    }
                })
            })
            .catch(err=> console.log(err))
        }
        )
    )
    passport.serializeUser(function(user, done) {
        console.log("Log 4")
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        console.log("Log 5")
        models.Customer.findByPk(id)
        .then( user =>  done(null, user))
      });
    }
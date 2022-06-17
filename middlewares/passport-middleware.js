const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user-updated-sequelize');
const dotenv = require("dotenv")
dotenv.config({ path: '.env' })

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY
console.log(jwtOptions);
let strategy = new JwtStrategy(jwtOptions, async(jwt_payload, next)=> {
    console.log('payload received', jwt_payload);
    let user = await User.findByPk(jwt_payload.id);
  
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });

module.exports = {strategy, jwtOptions}

  
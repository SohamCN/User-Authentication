const Mongoose = require("mongoose");
const Joi = require("joi");
const Joigoose = require("joigoose")(Mongoose, { convert: false , timestamps:true});

var joiUserSchema = Joi.object().keys({
    name: Joi.string().required().min(3).max(10),
    email:Joi.string().email().required(),
    phone:parseInt(Joi.string().regex(/^[6-9]\d{9}$/).required()),
    password:Joi.string().required(),
    timeCreated: Joi.date().timestamp()
})

var mongooseUserSchema = new Mongoose.Schema(
    Joigoose.convert(joiUserSchema)
  );

module.exports = Mongoose.model("User", mongooseUserSchema);

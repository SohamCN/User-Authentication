const Mongoose = require("mongoose");
const Joi = require("joi");
const Joigoose = require("joigoose")(Mongoose);

var joiUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(10),
    email:Joi.string().email().required(),
    phone: Joi.string().regex(/^[6-9]\d{9}$/).required(),
    password:Joi.string().required()
})

var mongooseUserSchema = new Mongoose.Schema(
    Joigoose.convert(joiUserSchema),{timestamps: true}
  );

const Users = Mongoose.model("User", mongooseUserSchema);

module.exports = Users;

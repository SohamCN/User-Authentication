const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: {
        type: String, minlength: 3, maxLength:10, required:[true,'Name needs to be input']
    },
    email:{
        type: mongoose.SchemaTypes.Email, required:[true, 'Email needs to be in proper email format']
    },
    phone:{
        type: Number , validate: [/^[6-9]\d{9}$/,'Please Enter a valid 10 digit mobile number'], required:[true, 'Phone needs to be input']
    },
    password:{
        type: String ,
        required:[true,'Password must be input']
    },
},{
    timestamps: true
})

/*userSchema.methods.joiValidate = (obj)=> {
    console.log("amaderbostu===",obj);
	var Joi = require('joi');
	var schema = {
		name: Joi.string().min(4).max(30).required(),
        email: Joi.string().email().required(),
        phone:Joi.string().min(10).max(10).required(),
		password: Joi.string().min(8).max(30).required()
	}
    console.log("Schemaache",schema);
	const validation = schema.validate(obj);
    return validation;
}*/

const UserAuthDB = mongoose.model('userAuth', userSchema);

module.exports = UserAuthDB

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING)
const UserAuth = require('../models/user-sequelize')(sequelize);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const register = async(req,res,next)=>{
    await bcrypt.hash(req.body.password, 10, async(err, hashedPass)=>{
        if(err){
            res.json({
                error:err
            })
        }
        try{
           const created = await UserAuth.create({
            username: req.body.username,
            password: hashedPass,
        })

            res.status(200).send(created)
        
    }catch(err){
            res.status(500).send(err.message)
        }
            
    })
}

const getAllUsers = async (req,res,next)=>{
 try{  
       const data = await UserAuth.findAll()
    
        res.status(200).send(data)
}catch(err){
        res.status(500).send(err.message)
    }
}

module.exports = {register, getAllUsers}
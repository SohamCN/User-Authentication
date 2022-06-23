const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserAuth = User.UserAuthDB;
const Product = User.ProductDB;

const register = async(req,res,next)=>{
    bcrypt.hash(req.body.password, 10, async(err, hashedPass)=>{
        if(err){
            res.json({
                error:err
            })
        }
        let user =  await new UserAuth({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass,
            productId: req.body.productId
        })
        console.log("SaveHolo??",user);
        user.save()
        .then(data=>{
            res.status(200).send(data)
        })
        .catch(err=>{
            res.status(500).send(err.message)
        })
            
    })
}

const login = async(req,res,next)=>{
    let {username, password} = req.body;
    

   let userloggedIn = await UserAuth.findOne({$or:[{email:username},{phone:username}]})
        if(userloggedIn){
            bcrypt.compare(password, userloggedIn.password, (err,result)=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name:userloggedIn.name},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message:'Login Successful!',
                        token
                    
                })
                }else{
                    res.json({message:'Username and Password not matching'})
                }
            })
    
        }else{
            res.json({
                message:'No User found!'
            })
        }
    }
    

const editUser = async (req,res,next)=>{
    console.log("next:", next);
    const id = req.params.id;

    if(req.body.password){
        bcrypt.hash(req.body.password, 10, async (err, hashedPass)=>{
            
            req.body.password = hashedPass;
            let updatedUser = await UserAuth.findByIdAndUpdate(id, req.body, {new:true})
            if(updatedUser){
                res.status(200).send({message: "Update Successful", updatedUser})
            }else{
                res.status(500).send({
                    message: "Update Failed!"
                })
            }
        })
    }else{
    let updatedUser = await UserAuth.findByIdAndUpdate(id, req.body, {new:true})
    if(updatedUser){
        res.status(200).send({message:"Update Successful", updatedUser})
    }else{
        res.status(500).send({
            message: "Update Failed!"
        })
    }
    /*UserAuth.findByIdAndUpdate(id, req.body, { new: true})
    .then(user=>{
        if(user){
            res.json({
                message:'Update Successful!',
                user
            })
         }else{
             res.status(404).json({
                 message:'Update not succesful'
             })
         }
              
            })
    .catch(error=>{
        res.status(500).json({
            message: `Error due to updating perhaps user  with ${id} not found`
        }, error)
    })
}*/
    }
}
const deleteUser = async(req,res,next)=>{
    const id = req.params.id;
    let deletedUser = await UserAuth.findByIdAndDelete(id);
    if(deletedUser){
        //const id = req.params.id;
        res.status(200).send({message:"User Deleted Succesfully", deletedUser})
    }else{
        res.status(500).send({message:"Error encountered while trying to delete"})
    }
}

const deleteAllUsers = async(req,res,next)=>{
   let deletedUsers = await UserAuth.deleteMany()
    if(deletedUsers.deletedCount!=0){
        res.send({message:"All data deleted", deletedUsers})
    }else{
        res.send({messsage:"Error While deleting database, probably all records deleted"})
    }
}

const getUserById = async(req,res,next)=>{
    
    try{
        let id = req.params.id
        let user = await UserAuth.findById(id).select('productId').populate({'path':'productId',
        'select':'name -_id'})
        res.status(200).send(user)
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
    
}

const getAllUsers = async(req,res,next)=>{
    try{
        let users = await UserAuth.find().populate({'path':'productId',
    'match':{'name':'Guitar'}})
        let filteredUsers = await users.filter(item=> (item.productId!=null))
        res.status(200).send(filteredUsers)
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

const postProduct = async(req,res,next)=>{
    try{
        let newProduct = {
            name:req.body.name,
            quantity: req.body.quantity,
            price:req.body.price
        }
        let product = await Product.create(newProduct)
        res.status(200).send(product)
    }catch(err){
        res.status(500).send({
            message:err.message
        })
    }
}

module.exports = {register, login, editUser, deleteUser, deleteAllUsers, getUserById, getAllUsers, postProduct}
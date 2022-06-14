//const { Sequelize } = require("sequelize")

//const sequelize = new Sequelize(process.env.POSTGRES_CONNECTION_STRING)
//const UserAuth = require("../models/user-sequelize")(sequelize)
const UserAuth = require("../models/user-updated-sequelize");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const register = async (req, res, next) => {
  await bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      })
    }
    try {
      const created = await UserAuth.create({
        username: req.body.username,
        password: hashedPass,
        email: req.body.email,
        phone: req.body.phone
      })

      res.status(201).send(created)
    } catch (err) {
      res.status(500).send(err.message)
    }
  })
}

const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserAuth.findAll()

    res.status(200).send(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const login = async (req, res, next) => {
  let { username, password } = req.body

  let userloggedIn = await UserAuth.findOne({ where: { username: username } })
  console.log("userloggedIn==", userloggedIn)
  if (userloggedIn) {
    bcrypt.compare(password, userloggedIn.password, (err, result) => {
      if (err) {
        res.json({
          error: err,
        })
      }
      if (result) {
        let token = jwt.sign({ name: userloggedIn.name }, "verySecretValue", {
          expiresIn: "1h",
        })
        res.json({
          message: "Login Successful!",
          token,
        })
      } else {
        res.json({ message: "Username and Password not matching" })
      }
    })
  } else {
    res.json({
      message: "No User found!",
    })
  }
}

const editUser = async (req, res, next) => {
  const id = req.params.id

  if (req.body.password) {
    await bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
      req.body.password = hashedPass
      try {
        const updatedUser = await UserAuth.update(
          req.body,
          { where: { id: id } },
          { new: true }
        )
        console.log(updatedUser)
        res.status(200).send({ message: "Update Successful", updatedUser })
      } catch (err) {
        res.status(500).send(err.message)
      }
    })
  } else {
    try {
      await UserAuth.update(
        req.body,
        { where: { id: id } }
      )
      //console.log(updatedUser)
      let updated = await UserAuth.findByPk(id);
      res.status(200).send({ message: "Update Successful", updated })
    } catch (err) {
      res.status(500).send({
        message: err.message,
      })
    }
  }
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  let deletedEntry = await UserAuth.findByPk(id);
  try {
    let deleted = await UserAuth.destroy({ where: { id: id } })
    console.log(deleted)
    res.sendStatus(200).send(deletedEntry)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

module.exports = { register, getAllUsers, login, editUser, deleteUser }

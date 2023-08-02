const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controllers/user_controller`)
const auth = require(`../auth/auth`)
// const {authorizeAdmin} = require(`../controllers/auth_controller`)
// const {authorizeManajer} = require(`../controllers/auth_controller`)

app.post("/login", userController.login)
app.post("/", userController.addUser)
app.get("/",  userController.getAllUser)
app.post("/find",  userController.findUser)
app.put("/:id_user",  userController.updateUser)
app.delete("/:id_user",  userController.deleteUser)

module.exports = app
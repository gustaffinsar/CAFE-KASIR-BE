const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controllers/menu_controller`)
// const {authorizeAdmin} = require(`../controllers/auth_controller`)
// const {authorizeManajer} = require(`../controllers/auth_controller`)

app.post("/",  menuController.addMenu)
app.get("/", menuController.getAllMenu)
app.post("/find",  menuController.findMenu)
app.put("/:id_menu", menuController.updateMenu)
app.delete("/:id_menu", menuController.deleteMenu)

module.exports = app
const express = require(`express`)
const app = express()
app.use(express.json())
const mejaController = require(`../controllers/meja_controller`)
// const {authorizeAdmin} = require(`../controllers/auth_controller`)
// const {authorizeManajer} = require(`../controllers/auth_controller`)

app.post("/",  mejaController.addMeja)
app.get("/", mejaController.getAllMeja)
app.post("/find",  mejaController.findMeja)
app.put("/:id_meja", mejaController.updateMeja)
app.delete("/:id_meja", mejaController.deleteMeja)

module.exports = app
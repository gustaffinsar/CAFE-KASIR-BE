const express = require(`express`)
const app = express()
app.use(express.json())
const transaksiController = require(`../controllers/transaksi_controller`)
const auth = require("../auth/auth")
// const {authorizeKasir} = require(`../controllers/auth_controller`)
// const {authorizeManajer} = require(`../controllers/auth_controller`)

app.post("/",  transaksiController.addtransaksi)
app.get("/", transaksiController.getAllTransaksi)
app.post("/find", transaksiController.findTransaksi)
app.put("/:id_transaksi", transaksiController.updateTransaksi)
app.delete("/:id_transaksi", transaksiController.deleteTransaksi)

module.exports = app

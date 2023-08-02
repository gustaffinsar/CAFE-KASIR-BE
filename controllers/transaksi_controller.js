const detailTransaksiModel = require(`../models/index`).detail_transaksi
const transaksiModel = require(`../models/index`).transaksi
const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja
const Op = require(`sequelize`).Op
const Sequelize = require("sequelize");
const sequelize = new Sequelize("cafe_kasir", "root", "", {
    host: "localhost",
    dialect: "mysql",
})

exports.addtransaksi = async(request, response) => {
    let newTransaksi = {
        tgl_transaksi: new Date(),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: `belum_bayar`,
        detail_transaksi:[
            {id_menu: request.body.id_menu},
            {harga: request.body.harga},
        ],
    };
  
    // update status meja
    await mejaModel.update({status: false}, {where:{id_meja:request.body.id_meja}});
  
    // insert ke tabel 
    transaksiModel
    .create(newTransaksi)
    .then(async (result) => {
        let detail_transaksi =request.body.detail_transaksi
        // asumsinya detail_transaksi itu bertipe array
        let id = result.id_transaksi
        for (let i = 0; i < detail_transaksi.length; i++) {
            detail_transaksi[i].id_transaksi = id;
        }
  
        // insert ke tabel detail_transaksi
        await detailtransaksiModel
        .bulkCreate(detail_transaksi)
        // create = insert 1 baris / 1 data
        // bulkCreate = bisa banyak data(array)
        .then(result => {
            return response.json({
                message:`Data transaksi berhasil ditambahkan`
            });
        })
        .catch(error => {
            return response.json({
                message: error.message
            });
        });
    })
    .catch(error => {
        return response.json({
            message: error.message
        });
    });
  };

exports.getAllTransaksi = async (request, response) => {
    let transaksi = await transaksiModel.findAll();
    return response.json({
        success: true,
        data: transaksi,
        message: `All transaction has been loaded`,
    })
}

exports.findTransaksi = async (request, response) => {
    let keyword = request.body.nama_pelanggan

    let transaksi = await transaksiModel.findAll({
        where: {
            [Op.or]: [
                { nama_pelanggan: { [Op.substring]: keyword } },
                { tgl_transaksi: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: transaksi,
        message: `All transaksi have been loaded`
    })
}

exports.updateTransaksi = async (request, response) => {
    let idTransaksi = request.params.id_transaksi

    let transaksi = {
        tgl_transaksi: Date(),
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }
    transaksiModel.update(transaksi, { where: { id_transaksi: idTransaksi } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data has been updated`,
                data: result
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message,
            })
        })
}

exports.deleteTransaksi = async (request, response) => {
    let idTransaksi = request.params.id_transaksi

    transaksiModel.destroy({ where: { id_transaksi: idTransaksi } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data transaksi has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}
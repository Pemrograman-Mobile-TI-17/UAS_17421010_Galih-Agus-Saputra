const sayur = require('../model/Sayur.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
exports.inputDataSayur = (data, gambar) =>
    new Promise(async (resolve, reject) =>{

        const sayurBaru = new sayur({
            kodeSayur : data.kodeSayur,
            judulSayur : data.judulSayur,
            petani: data.petani,
            daerah: data.daerah,
            tanggalPanen: data.tanggalPanen,
            harga: data.harga,
            gambar: gambar
        })

        await sayur.findOne({kodeSayur: data.kodeSayur})
            .then(sayur =>{
                if (sayur){
                    reject(response.commonErrorMsg('Kode Sayur Sudah Digunakan'))
                }else{
                    sayurBaru.save()
                        .then(r =>{
                            resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
                        }).catch(err =>{
                        reject(response.commonErrorMsg('Mohon Maaf Input Sayur Gagal'))
                    })
                }
            }).catch(err =>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server kami'))
            })
    })

exports.lihatDataSayur = () =>
    new Promise(async (resolve, reject) =>{
        await cuka.find({})
            .then(result =>{
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server kami')))
    })

exports.lihatDetailDataSayur = (kodeSayur) =>
    new Promise(async (resolve, reject) =>{
        await sayur.findOne({kodeSayur: kodeSayur})
            .then(result =>{
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server kami')))
    })

exports.updateSayur = (id, data, gambar) =>
    new Promise(async (resolve, reject)=>{
        await sayur.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodeSayur : data.kodeSayur,
                    judulSayur : data.judulSayur,
                    petani: data.petani,
                    daerah: data.daerah,
                    tanggalPanen: data.tanggalPanen,
                    harga: data.harga,
                    gambar: gambar
                }
            }
        ).then(sayur =>{
            resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
        }).catch(err =>{
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server kami'))
        })
    })

exports.hapusSayur = (_id) =>
    new Promise(async (resolve, reject) =>{
        await sayur.remove({_id: ObjectId(_id)})
            .then(() =>{
                resolve(response.commonSuccessMsg('Berhasil Menghapus Data'))
            }).catch(() =>{
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server kami'))
            })
    })
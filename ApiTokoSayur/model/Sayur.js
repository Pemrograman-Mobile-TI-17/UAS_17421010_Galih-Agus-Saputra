const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    kodeSayur: {
        type: String
    },
    judulSayur: {
        type: String
    },
    petani: {
        type: String
    },
    daerah: {
        type: String
    },
    tanggalPanen: {
        type: String
    },
    hargaSayur: {
        type: String
    },
    gambar: {
        type: String
    }
})
module.exports = mongoose.model('sayur', userSchema)
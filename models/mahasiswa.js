const mongoose = require('mongoose');

const MahasiswaSchema = new mongoose.Schema({
    name: String,
    jurusan: String,
    email: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Mahasiswa', MahasiswaSchema)
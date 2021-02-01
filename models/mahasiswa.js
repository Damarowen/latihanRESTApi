const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const MahasiswaSchema = new mongoose.Schema({
    id: Number,
    nama: {
        type: String,
        required: [true, 'Please add a description'],
    },
    jurusan: String,
    email: String
}, {
    timestamps: true
})

//*auto increment ID
MahasiswaSchema.plugin(AutoIncrement, {inc_field: 'id'});


module.exports = mongoose.model('Mahasiswa', MahasiswaSchema, 'Mahasiswa')
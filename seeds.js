const fs = require('fs');
const connectDB = require('./database')

const Mahasiswa = require('./models/mahasiswa')

connectDB();

const mahasiswa = JSON.parse(
    fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
);

const importData = async () => {
    await Mahasiswa.create(mahasiswa)

    console.log('data imported..')
    process.exit()
}

const deleteData = async () => {

    await Mahasiswa.deleteMany();
    console.log('data destroyed..')
    process.exit()

}

process.argv[2] == 'i' ? importData() : deleteData() ;


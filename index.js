const express = require('express');
const app = express();
const connectDB = require('./database')
const fs = require('fs');

const port = 9000;

connectDB();

const mahasiswa = JSON.parse(
    fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
);

//* GET All Mahasiswa
//* /mahasiswa
app.get('/mahasiswa', (req, res) => {
    const id = req.query.id

    res.status(200).json({
        success: true,
        data: mahasiswa
    })
})

//* GET SINGLE Mahasiswa
//* /mahasiswa/:Id
app.get('/mahasiswa/:id', (req, res) => {
    const id = req.params.id
    const data = mahasiswa.filter(x => x.id.includes(id))

    if (data.length > 0) {
        const data = mahasiswa.find(x => x.id == id)
        res.status(200).json({
            success: true,
            data: data
        })
    } else {
        res.status(200).json({
            success: false,
            data: null
        })
    }

})




app.listen(port, (x) => {

    console.log(` listen to ${port} and ${x}`)

})
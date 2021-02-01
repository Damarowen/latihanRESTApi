const express = require('express');
const app = express();
const connectDB = require('./database')

const port = 9000;
const Mahasiswa = require('./models/mahasiswa')

connectDB();

// body parser
app.use(express.json());

//* GET All Mahasiswa
//* /mahasiswa
app.get('/mahasiswa', async (req, res) => {

    const data = await Mahasiswa.find({})
    res.status(200).json({
        success: true,
        count: data.length,
        data: data
    })
})

//* GET SINGLE Mahasiswa
//* /mahasiswa/:Id
app.get('/mahasiswa/:id', async (req, res) => {
    const id = req.params.id
    const data = await Mahasiswa.findOne({
        id: req.params.id
    })
    if (data) {
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


//* POST SINGLE Mahasiswa
//* /mahasiswa
app.post('/mahasiswa/', async (req, res) => {

    const data = await Mahasiswa.create(req.body)

    res.status(200).json({
        success: true,
        data: data
    });
    console.log('Success Post')
})

//* EDIT SINGLE Mahasiswa
//* /mahasiswa/:Id
app.put('/mahasiswa/:id', async (req, res) => {
    const id = req.params.id
    const data = await Mahasiswa.findOneAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })
    
    if(!data){
        res.status(404).json({
            success: false,
            data: null
        });
    }

    res.status(200).json({
        success: true,
        data: data
    });
    console.log('Success Edit')
})

//* DELETE SINGLE Mahasiswa
//* /mahasiswa/:Id
app.delete('/mahasiswa/:id', async (req, res) => {
    const id = req.params.id
    const data = await Mahasiswa.findOne({
        id: id
    })

    if(!data){
        res.status(404).json({
            success: false,
            data: null
        });
    }

    await data.deleteOne();

    res.status(200).json({
        success: true,
        data: data
    });
    console.log('Success Delete')
})



app.listen(port, (x) => {

    console.log(` listen to ${port} and ${x}`)

})
const express = require('express');
const app = express();
const connectDB = require('./database')

const port = 9000;
const Mahasiswa = require('./models/mahasiswa')

connectDB();

// body parser
app.use(express.json());

//* error handling
const validation = {
    isEmpty: obj => {
        return Object.entries(obj).length === 0;
    },

}


//* */ GET All Mahasiswa
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

    try {

        //* Validate whether body is empty or not
        if (validation.isEmpty(req.body)) {
            console.log(validation.isEmpty(req.body))
            return res.status(400).json({
                error: 'Request body is empty'
            });
        }

        const data = await Mahasiswa.create(req.body)

        res.status(200).json({
            success: true,
            data: data
        });
        console.log('Success Post')
    } catch(err){
        //* trigger mongoose validation from schema
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                error: message
            });
        }
    }

})

//* EDIT SINGLE Mahasiswa
//* /mahasiswa/:Id
app.put('/mahasiswa/:id', async (req, res) => {
    const id = req.params.id
    const data = await Mahasiswa.findOneAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    if (!data) {
        res.status(400).json({
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

    if (!data) {
        res.status(400).json({
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
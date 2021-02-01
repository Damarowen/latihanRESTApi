const express = require('express');
const app = express();
const connectDB = require('./database')

const port = 9000;

connectDB();

app.get('/', (req, res)  => {
    res.send('hai damar')
})


app.listen(port, (x) => {

    console.log(` listen to ${port} and ${x}`)

})